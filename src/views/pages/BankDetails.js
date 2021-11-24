/* eslint-disable no-tabs */
import { Fragment, useState, useEffect } from 'react'
import Select from 'react-select'
import '@styles/react/libs/react-select/_react-select.scss'
import classnames from 'classnames'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { selectThemeColors, isObjEmpty } from '@utils'
import { Label, FormGroup, Row, Col, Button, Form, Input, FormFeedback, Card, CardBody, CardHeader, CardTitle } from 'reactstrap'

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

//Preserve From state
const MyAlert = withReactContent(Swal)

const SignupSchema = yup.object().shape({

    acholder: yup.string().required("Account holder name is required"),
    bank_name: yup.string().required("Bank name is required"),
    acno: yup.string().required("Account no. is required"),
    ifsc: yup.string().required("IFSC no. is required")
})
// password: yup.string().required("Password is required"),
// confirmPassword: yup
//   .string()
//   .required()
//   .oneOf([yup.ref(password), null], 'Passwords must match')

// const bank = {
//     acholder: "Harshal Bokade",
//     bank_name: "SBI",
//     acno: "123456789",
//     ifsc: "SBI00420"
// }

const PersonalInfo = ({ type = 'bank' }) => {

    const { register, handleSubmit, control, formState: { errors }, trigger } = useForm({
        mode: "onBlur",
        resolver: yupResolver(SignupSchema)
    })
    const [UserData, setUserData] = useState([])
    const [NotUpdated, setNotUpdated] = useState(false)
    const [BankAccount, setBankAccount] = useState([])

    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem('userData')))
    }, [])

    const handleUpdateRequest = () => {
        MyAlert.fire({
            title: 'You have successfully updated the bank account',
            text: '',
            icon: 'success',
            // confirmButtonText: 'OK',
            customClass: {
                confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false
        }).then(() => location.reload())
    }

    useEffect(() => {
        try {
            axios
                .get(`${api.routes.get.bank_account}/${getUserId()}`, api.auth)
                .then(response => setBankAccount(response.data.data))
                .catch(error => {
                    MyAlert.fire('Kindly update your bank account for hassle free payouts', '', 'info')
                })
        } catch (e) {
            MyAlert.fire('Invalid Request', 'Kindly relogin to fix this issue', 'error')
        }
        // (response.data.user)
        // setUser(selectedUser)
    }, [])
    const onSubmit = (data) => {
        trigger()
        const Data = {
            member_id: UserData['id'],
            ...data
        }
        // console.log(Data)
        axios
            .post(api.routes.post.bank_account, Data, api.auth)
            .then(response => {
                handleUpdateRequest()
            })
    }

    return (
        <>
            <Card className="container">

                <CardHeader>
                    <CardTitle>Bank Details</CardTitle>
                </CardHeader>
                <CardBody className="">

                    <Form onSubmit={handleSubmit(onSubmit)} className="">
                        <Row>
                            <FormGroup tag={Col} md='6'>
                                <Label className='form-label' for={`account-holder-${type}`}>
                                    Account holder name
                                </Label>
                                <Input
                                    type='text'
                                    name='acholder'
                                    id={`account-holder-${type}`}
                                    value={BankAccount && BankAccount.acholder}
                                    placeholder='Ac holder name'
                                    {...register('acholder')}
                                    className={classnames({ 'is-invalid': errors['acholder'] })}
                                />
                                {errors.acholder && <FormFeedback>{errors.acholder.message}</FormFeedback>}
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup tag={Col} md='6'>
                                <Label className='form-label' for={`bank-name-${type}`}>
                                    Bank name
                                </Label>
                                <Input
                                    type='text'
                                    name='bank_name'
                                    value={BankAccount && BankAccount.bank_name}

                                    id={`bank-name-${type}`}
                                    placeholder='Bank name'
                                    {...register('bank_name')}
                                    className={classnames({ 'is-invalid': errors['bank_name'] })}
                                />
                                {errors.bank_name && <FormFeedback>{errors.bank_name.message}</FormFeedback>}
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup tag={Col} md='6'>
                                <Label className='form-label' for={`account-number-${type}`}>
                                    Account no.
                                </Label>
                                <Input
                                    type='number'
                                    name='acno'
                                    value={BankAccount && BankAccount.acno}
                                    id={`account-number-${type}`}
                                    placeholder='Account no.'
                                    {...register('acno')}
                                    className={classnames({ 'is-invalid': errors['acno'] })}
                                />
                                {errors.acno && <FormFeedback>{errors.acno.message}</FormFeedback>}
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup tag={Col} md='6'>
                                <Label className='form-label' for={`account-ifsc-${type}`}>
                                    IFSC code
                                </Label>
                                <Input
                                    type='text'
                                    name='ifsc'
                                    value={BankAccount && BankAccount.ifsc}
                                    id={`account-ifsc-${type}`}
                                    placeholder='IFSC'
                                    {...register('ifsc')}
                                    className={classnames({ 'is-invalid': errors['ifsc'] })}
                                />
                                {errors.ifsc && <FormFeedback>{errors.ifsc.message}</FormFeedback>}
                            </FormGroup>
                        </Row>

                        {BankAccount && !BankAccount.acno && <div className='d-flex justify-content-left'>
                            <Button.Ripple type='submit' color='primary' className='btn-next'>
                                <span className='align-middle d-sm-inline-block d-none'>Submit</span>
                                <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
                            </Button.Ripple>
                        </div>}
                    </Form>
                </CardBody>
            </Card>
        </ >
    )
}

export default PersonalInfo

