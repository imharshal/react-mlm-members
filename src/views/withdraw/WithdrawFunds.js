/* eslint-disable no-tabs */
import { Fragment, useState, useEffect } from 'react'
import Select from 'react-select'
import '@styles/react/libs/react-select/_react-select.scss'
import classnames from 'classnames'
import { ArrowLeft, ArrowRight, Info } from 'react-feather'
import { selectThemeColors, isObjEmpty } from '@utils'
import { Label, FormGroup, Row, Col, Button, Form, Input, FormFeedback, Card, CardBody, Alert, CardHeader, CardTitle, Spinner } from 'reactstrap'

import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.in'
import InputMask from 'react-input-mask'

import axios from 'axios'
import api, { getUserId } from '../../configs/apiConfig'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

const MyAlert = withReactContent(Swal)

//Preserve From state

const SignupSchema = yup.object().shape({

  amount: yup.number().typeError('Amount must be a number').default(1).required("Amount is requierd").min(200, 'Amount should be greater than Rs 200')
  // bankName: yup.string().required("Bank name is required"),
  // acno: yup.string().required("Account no. is required"),
  // ifsc: yup.string().required("IFSC no. is required")
})
// password: yup.string().required("Password is required"),
// confirmPassword: yup
//   .string()
//   .required()
//   .oneOf([yup.ref(password), null], 'Passwords must match')

const bank = {
  acholder: "Harshal Bokade",
  bank_name: "SBI",
  acno: "123456789",
  ifsc: "SBI00420"
}

const WithdrawFunds = ({ type = 'bank' }) => {

  const { register, handleSubmit, control, formState: { errors }, trigger } = useForm({
    mode: "onBlur",
    resolver: yupResolver(SignupSchema)
  })
  const [BankAccount, setBankAccount] = useState([])
  const [userData, setUserData] = useState([])
  const [Loading, setLoading] = useState(false)

  // const userData = JSON.parse(localStorage.getItem('userData'))

  const checkAccountUpdated = () => {
    MyAlert.fire({
      title: 'You have not updated the bank account!',
      text: 'Please update bank account to withdraw funds',
      icon: 'warning',
      // confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false
    }).then(() => { window.location = "/bank-details" })
  }

  const handleSuccess = () => {
    MyAlert.fire({
      title: 'Cashmind Payout Successful!',
      text: 'Check withdrawal history for transaction details',
      icon: 'success',
      // confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false
    }).then(() => { window.location = "/withdrawal-history" })
  }

  const handleFailure = () => {
    MyAlert.fire({
      title: 'Something went wrong',
      text: 'Please try after some time',
      icon: 'error',
      // confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false
    })
  }


  useEffect(() => {
    try {
      axios
        .get(`${api.routes.get.bank_account}/${getUserId()}`, api.auth)
        .then(response => setBankAccount(response.data.data))
        .catch(error => {
          checkAccountUpdated()
        })

      axios
        .get(api.routes.get.profile, api.auth)
        .then(response => setUserData(response.data.user))
        .catch(error => {
          checkAccountUpdated()
        })
    } catch (e) {
      MyAlert.fire('Invalid Request', 'Kindly relogin to fix this issue', 'error')
    }

    // (response.data.user)
    // setUser(selectedUser)
  }, [])


  const onSubmit = (data) => {
    trigger()
    setLoading(true)
    const Data = {
      member_id: userData.id,
      amount: data.amount
    }
    try {
      if (data.amount <= userData.main_wallet) {
        if (data.amount >= 200) {
          if (data.amount <= userData.withdraw_limit) {
            axios
              .post(api.routes.post.withdraw, Data, api.auth)
              .then(response => {
                setLoading(false)
                // console.log(response)
                const status = response.data.success
                if (status === true) {
                  handleSuccess()
                } else {
                  MyAlert.fire('Payout Failed!', response.data.message, 'error')

                }
                // if (status === "success" || status === "pending") {
                //   handleSuccess()
                // } else if (status === "failure") {
                //   MyAlert.fire('Payout Failed!', response.data.data.message, 'error')
                // }
              })
          } else MyAlert.fire('Withdraw limit exceeded', `Your withdraw limit is Rs ${userData.withdraw_limit}`, 'error')

          // .catch(e => console.log(e))
        } else MyAlert.fire('Minimun Payout is Rs 200', 'Please check your main fund', 'error')
      } else MyAlert.fire('Insufficient Balance', 'Please check your main fund', 'error')
    } catch (e) {
      console.log(e)
      // MyAlert.fire('Invalid Request', 'Kindly relogin to fix this issue', 'error')
    }
  }

  return (
    <>
      <Card className="container">

        <CardHeader>
          <CardTitle>IMPS Withdraw Funds</CardTitle>
        </CardHeader>
        <CardBody className="">
          <Alert color='primary' >
            <div className='alert-body'>
              <div className=' ml-2 mt-2 text-sm'>
                <Label className='h6 text-secondary'>After successful payout, amount will be credited to your bank account instantly</Label> <br />
              </div>
              <div className=' ml-2 mt-2 text-sm'>
                <Label className='h6 text-danger'>Note: Admin charge of 10%, TDS 5%, IMPS charge Rs 5 will be deducted on every payout.</Label> <br />
              </div>
            </div>
          </Alert>
          <Form onSubmit={handleSubmit(onSubmit)} className="mt-5">
            <Row>
              <FormGroup tag={Col} md='3'>
                <Label className='form-label' for={`amount-${type}`}>
                  Enter amount to withdraw
                </Label>
                <Input
                  type='number'
                  name='amount'
                  id={`amount-${type}`}
                  placeholder='Amount'
                  {...register('amount')}
                  className={classnames({ 'is-invalid': errors['amount'] })}
                />
                {errors.amount && <FormFeedback>{errors.amount.message}</FormFeedback>}
              </FormGroup>
            </Row>
            <Button.Ripple type='submit' color='primary' disabled={Loading}>
              {Loading ? <>
                <Spinner color='white' size='sm' type='grow' />
                <span className='ml-50'>Processing...</span>
              </> : 'Withdraw Fund'}
              <ArrowRight
                size={14}
                className="align-middle ml-sm-25 ml-0"
              ></ArrowRight>
            </Button.Ripple>
          </Form>

          <Card className='col-md-6 border-primary mt-3'>
            <CardHeader className='d-flex justify-content-between align-items-center pt-75 pb-1'>
              <h5 className='mb-0'>Amount will be withdrawn to this account</h5>

            </CardHeader>
            <CardBody>

              <ul className=' list-unstyled my-1'>

                <li className='my-25'>
                  <span className='align-middle'><strong>Account no.:</strong> {BankAccount.acno}</span>
                </li>
                <li className='my-25'>
                  <span className='align-middle'><strong>IFSC:</strong> {BankAccount.ifsc}</span>
                </li>
                <li>
                  <span className='align-middle'><strong>Account holder:</strong> {BankAccount.acholder}</span>
                </li>
              </ul>
            </CardBody>
          </Card>

          {/* {<div className='d-flex justify-content-left'>
              <Button.Ripple type='submit' color='primary' className='btn-next'>
                <span className='align-middle d-sm-inline-block d-none'>Submit</span>
                <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
              </Button.Ripple>
            </div>} */}
        </CardBody>
      </Card>
    </ >
  )
}

export default WithdrawFunds

