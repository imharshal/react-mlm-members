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


//Preserve From state

const SignupSchema = yup.object().shape({

    acholder: yup.string().required("Account holder name is required"),
    bankName: yup.string().required("Bank name is required"),
    acno: yup.string().required("Account no. is required"),
    ifsc: yup.string().required("IFSC no. is required")
})
// password: yup.string().required("Password is required"),
// confirmPassword: yup
//   .string()
//   .required()
//   .oneOf([yup.ref(password), null], 'Passwords must match')

const bank = {
    acholder: "Harshal Bokade",
    bank_name: "SBI",
    acno:"123456789",
    ifsc: "SBI00420"
}

const PersonalInfo = ({ type = 'bank' }) => {

    const { register, handleSubmit, control, formState: { errors }, trigger } = useForm({
        mode: "onBlur",
        resolver: yupResolver(SignupSchema)
    })


    const onSubmit = (data) => {
        trigger()
        console.log(data)
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
                                    value={bank && bank.acholder}
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
                                    name='bankName'
                                    value={bank && bank.bank_name}

                                    id={`bank-name-${type}`}
                                    placeholder='Bank name'
                                    {...register('bankName')}
                                    className={classnames({ 'is-invalid': errors['bankName'] })}
                                />
                                {errors.bankName && <FormFeedback>{errors.bankName.message}</FormFeedback>}
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
                                    value={bank && bank.acno}
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
                                    value={bank && bank.ifsc}
                                    id={`account-ifsc-${type}`}
                                    placeholder='IFSC'
                                    {...register('ifsc')}
                                    className={classnames({ 'is-invalid': errors['ifsc'] })}
                                />
                                {errors.ifsc && <FormFeedback>{errors.ifsc.message}</FormFeedback>}
                            </FormGroup>
                        </Row>

                        {bank && !bank.acno && <div className='d-flex justify-content-left'>
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

