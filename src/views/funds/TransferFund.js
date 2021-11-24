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
import AutoComplete from '@components/autocomplete'


import axios from 'axios'
import api, { updateProfile } from '../../configs/apiConfig'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

const MyAlert = withReactContent(Swal)

//Preserve From state

const FundTransferSchema = yup.object().shape({
  receiver: yup.string().required("Enter valid username!").matches(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm, 'This is not a valid cashmind username'),
  amount: yup.number().typeError('Amount must be a number').default(1).required("Amount is requierd")
  // bankName: yup.string().required("Bank name is required"),
  // acno: yup.string().required("Account no. is required"),
  // ifsc: yup.string().required("IFSC no. is required")
})

const WithdrawFunds = ({ type = 'transfer' }) => {

  const { register, handleSubmit, control, formState: { errors }, trigger } = useForm({
    mode: "onBlur",
    resolver: yupResolver(FundTransferSchema)
  })
  const [BankAccount, setBankAccount] = useState([])
  const [userData, setUserData] = useState([])
  const [Loading, setLoading] = useState(false)
  const [Receiver, setReceiver] = useState([])
  const [ReceiverList, setReceiverList] = useState([])
  const [InvalidReceiver, setInvalidReceiver] = useState(false)
  // const userData = JSON.parse(localStorage.getItem('userData'))

  useEffect(() => {
    axios
      .get(api.routes.get.profile, api.auth)
      .then(response => {
        setUserData(response.data.user)
      })
  }, [])

  useEffect(() => {
    axios
      .get(api.routes.get.member_list)
      .then(response => {
        setReceiverList(response.data.data)
      })
  }, [])

  const handleReceiverBlur = () => {
    try {
      const valid = ReceiverList.filter(x => x.username.toLowerCase() === (Receiver.lead.toLowerCase()))
      // console.log(valid)
      if (!valid || Receiver.name === null) setInvalidReceiver(true)
      else setInvalidReceiver(false)
    } catch (e) {
      setInvalidReceiver(true)
      console.log(e)
    }

  }

  const handleSuccess = () => {
    MyAlert.fire({
      title: 'Fund Transfer Successful!',
      text: 'Check fund wallet history for transaction details',
      icon: 'success',
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false
    }).then(() => { window.location = "/funds-history" })
  }

  const onSubmit = (data) => {
    trigger()
    setLoading(true)
    const Data = {
      sender_id: userData.id,
      receiver_id: Receiver.id,
      amount: data.amount
    }

    try {
      if (data.amount < parseFloat(userData.fund_wallet)) {
        if (Receiver.id !== null) {
          axios
            .post(api.routes.post.transfer_fund, Data, api.auth)
            .then(response => {
              setLoading(false)
              // console.log(response)
              const status = response.data.success
              if (status === true) {
                handleSuccess()
              } else {
                MyAlert.fire(response.data.error, response.data.message, 'error')
              }

            })
        } else {
          MyAlert.fire('Invalid Receiver!', 'Please select valid receiver to transfer fund.', 'error')
        }
      } else {
        MyAlert.fire('Insufficient Balance', 'Please add fund to your fund wallet.', 'error')
      }
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
      // MyAlert.fire('Invalid Request', 'Kindly relogin to fix this issue', 'error')
    }
  }

  return (
    <>
      <Card className="container h-100" style={{ minHeight: '800px' }}>

        <CardHeader>
          <CardTitle>Instant Funds Transfer</CardTitle>
        </CardHeader>
        <CardBody className="">
          <Alert color='primary' >
            <div className='alert-body'>
              <div className=' ml-2 mt-2 text-sm'>
                <Label className='h6 text-secondary'>After successful transfer amount will be deducted from your fund wallet.</Label> <br />
                <Label className='h6 text-secondary'>Amount will be credited to receiver's fund wallet instanly.</Label> <br />
              </div>
              {/* <div className=' ml-2 mt-2 text-sm'>
                <Label className='h6 text-danger'>Note: Admin charge of 10%, TDS 5%, IMPS charge Rs 5 will be deducted on every payout.</Label> <br />
              </div> */}
            </div>
          </Alert>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <FormGroup tag={Col} md='3'>
                <Label className='form-label' for={`amount-${type}`}>
                  Enter amount to transfer
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
            <Row>
              <FormGroup tag={Col} md='6'>
                <Label className='form-label' for={`lead-${type}`}>
                  Select receiver to transfer fund
                  <span className='ml-1 text-primary form-control-sm'>
                    <Info size={15} />{' '}
                    Search username and select from dropdown
                  </span>

                </Label>

                <Controller
                  name="receiver"
                  control={control}
                  render={({ field }) => (
                    <AutoComplete
                      onBlur={handleReceiverBlur}
                      {...field}
                      id={`transeferto-${type}`}
                      suggestions={ReceiverList}
                      suggestionLimit={5}
                      className={classnames('form-control', { 'is-invalid': InvalidReceiver })}
                      filterKey='username'
                      placeholder="Cashmind username"
                      customRender={(
                        suggestion,
                        i,
                        filteredData,
                        activeSuggestion,
                        onSuggestionItemClick,
                        onSuggestionItemHover
                      ) => (
                        <li
                          className={classnames('suggestion-item border-bottom', {
                            active: filteredData.indexOf(suggestion) === activeSuggestion
                          })}
                          key={i}
                          onMouseEnter={() => onSuggestionItemHover(filteredData.indexOf(suggestion))}
                          onClick={e => {
                            // console.log(e.target.getAttribute('aria-level'))
                            onSuggestionItemClick(null, e)
                            setReceiver({ id: e.target.getAttribute('aria-level'), lead: e.target.getAttribute('aria-selected'), name: e.target.getAttribute('aria-label') })
                          }}
                          aria-selected={suggestion.username}
                          aria-label={suggestion.fullname}
                          aria-level={suggestion.id}
                        >
                          <Row aria-selected={suggestion.username} aria-label={suggestion.fullname} aria-level={suggestion.id}>
                            <Col md={4} aria-selected={suggestion.username} aria-label={suggestion.fullname} aria-level={suggestion.id}>
                              <span className="badge badge-primary" aria-selected={suggestion.username} aria-label={suggestion.fullname} aria-level={suggestion.id}>{`@ ${suggestion.username}`}</span>
                            </Col>
                            <Col md={8} className="mt-md-0 mt-1" aria-selected={suggestion.username} aria-label={suggestion.fullname} aria-level={suggestion.id}>
                              <span className=" text-primary font-weight-bolder" aria-selected={suggestion.username} aria-label={suggestion.fullname} aria-level={suggestion.id}>{suggestion.fullname}</span>
                            </Col>{/* <hr className="m-0 p-0"/> */}
                          </Row>
                        </li>
                      )}
                    />
                  )}
                />
                {errors.receiver && <Label className="text-danger">{errors.receiver.message}</Label>}
                {InvalidReceiver && !errors.receiver && <Label className="text-danger">Enter valid username!</Label>}
              </FormGroup>
            </Row>
            {Receiver.lead && <Alert color='info' className="col-md-6">
              <div className='alert-body'>
                <Info size={15} />{' '}
                <Label className='text-info'>Fund will transfer to</Label> <br />
                <span className="ml-2 text-secondary font-weight-bolder">{Receiver.name}</span>
              </div>
            </Alert>}

            <Button.Ripple type='submit' color='primary' disabled={Loading}>
              {Loading ? <>
                <Spinner color='white' size='sm' type='grow' />
                <span className='ml-50'>Processing...</span>
              </> : 'Transfer Fund'}
              <ArrowRight
                size={14}
                className="align-middle ml-sm-25 ml-0"
              ></ArrowRight>
            </Button.Ripple>
          </Form>
        </CardBody>
      </Card>
    </ >
  )
}

export default WithdrawFunds

