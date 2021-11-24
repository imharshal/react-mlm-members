/* eslint-disable no-tabs */
import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { ArrowLeft, ArrowRight, CheckCircle, Info, XCircle } from 'react-feather'
import { selectThemeColors, isObjEmpty } from '@utils'
import { Label, FormGroup, Row, Col, Button, Form, Input, Alert, FormFeedback } from 'reactstrap'

import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import AutoComplete from '@components/autocomplete'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Redirect } from 'react-router'
import api from '@configs/apiConfig'


const MyAlert = withReactContent(Swal)


const SignupSchema = yup.object().shape({
    // lead: yup.string().required("Enter valid referrer or enter admin ").matches(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm, 'This is not a valid cashmind id'),
    username: yup.string().required("It is required to create cashmind id").min(5, "Minimum 5 characters required.").matches(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm, 'This id does\'t meet our criteria'),
    // password: yup.string().required("Password is required"),
    // confirmPassword: yup.object().required().oneOf([yup.ref(password), null], 'Passwords must match')

    password: yup.string()
        .min(6, "Minimum 6 characters required")
        .required('Password is required'),
    confirmPassword: yup.string()
        .min(6, "Minimum 6 characters required")
        .required('Enter password again')
        .oneOf([yup.ref('password'), null], "Password does't match")
})

const FinishReferral = ({ updateData, username, Data, resetData, stepper, type }) => {
    // console.log(username)
    const { register, handleSubmit, control, setValue, getValues, formState: { errors }, trigger } = useForm({
        mode: "onBlur",
        resolver: yupResolver(SignupSchema)
    })
    const [Lead, setLead] = useState([])
    const [InvalidLead, setInvalidLead] = useState(false)

    const [FlagSubmitted, setFlagSubmitted] = useState(0)

    const [LeadList, setLeadList] = useState([])
    const [avail, setAvail] = useState([{ taken: true, avail: false, invalid: false }])
    const [ServerErrors, setServerErrors] = useState([])

    const handleInvalidLeadMessage = () => {
        return MyAlert.fire({
            title: 'Invalid Referral link',
            text: 'Kindly use valid referral link or signup with referrer\'s username. ',
            icon: 'error',
            confirmButtonText: 'Signup with referrer id',
            customClass: {
                confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {
                window.location = "/signup"
            }
            if (result.isDismissed || result.isDenied) {
                window.location = "/login"
            }
        })
    }

    const handleLeadCheck = (data) => {
        try {
            // console.log(LeadList.filter(x => console.log(x)))
            const valid = data.filter(x => x.username.toLowerCase() === (username.toLowerCase()))
            // console.log(valid)
            if (!valid.length) handleInvalidLeadMessage()
        } catch (e) {
            handleInvalidLeadMessage()
            // console.log(e)
        }

    }

    useEffect(() => {
        axios
            .get(api.routes.get.member_list)
            .then(response => {
                // console.log(response.data.data.length)
                // response.data.data.push({ id: 0, username: "admin", fullname: "Cashmind" })
                // if (response.data.data.length === 0) setLeadList([{ username: "admin", fullname: "Avinash Shete" }])
                setLeadList(response.data.data)
                response.data.data.filter(x => {
                    if (x.username.toLowerCase() === username.toLowerCase()) {
                        const referrer = {
                            id: x.id,
                            lead: x.username,
                            name: x.fullname
                        }
                        setLead(referrer)
                    } else handleLeadCheck(response.data.data)

                })
            })
    }, [])

    // TODO
    const handleAvailability = (e) => {
        const selected = LeadList.filter(x => x.username.toLowerCase() === (e.target.value.toLowerCase()))
        if (e.target.value === '') setAvail({ invalid: true })
        else if (selected.length > 0) setAvail({ taken: true })
        else setAvail({ avail: true })
    }

    const handleSuccess = () => {
        return MyAlert.fire({
            title: 'You are registered successfully',
            text: '',
            icon: 'success',
            confirmButtonText: 'OK, Go to Login',
            customClass: {
                confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false
        }).then(() => {
            window.location = "/login"
        })
    }
    const handleError = (error) => {
        return MyAlert.fire({
            title: 'Failed to Register',
            text: null ? 'Please try again' : error.email || error.username,
            icon: 'error',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Try again',
            customClass: {
                cancelButton: 'btn btn-danger',
                confirmButton: 'mr-1 btn btn-primary'
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {
                setFlagSubmitted(0)
                // axios.post(api.routes.post.signup, Data)
                //     .then(response => {
                //         console.log(response)
                //         if (response.status === 200 && response.data.status === true) handleSuccess()
                //         else if (response.data.error) handleError(response.data.error || null)
                //     })
            }
            if (result.isDismissed || result.isDenied) {
                location.reload()
            }
        })
    }
    const handleResubmit = (error) => {
        return MyAlert.fire({
            title: 'Error',
            text: error.email || error.username,
            icon: 'error',
            confirmButtonText: 'OK',
            customClass: {
                confirmButton: 'mr-1 btn btn-primary'
            },
            buttonsStyling: false
        }).then(() => {
            window.location = "/signup"
        })
    }

    const signup = async () => {
        setFlagSubmitted(FlagSubmitted + 1)
        try {
            // console.log(Data)
            await axios.post(api.routes.post.signup, Data)
                .then(response => {
                    // console.log(response.data.error)
                    if (response.data.success === true) handleSuccess()
                    else if (response.data.error) handleError(response.data.error || null)
                    // else handleError(null)

                }).catch(error => {
                    // console.log(error)
                    handleError()
                })
        } catch (e) { console.log(e) }
        // resetData()
    }


    useEffect(() => {
        // console.log(Data)
        setFlagSubmitted(0)
        if (!FlagSubmitted && Data.username) signup()
    }, [Data])

    const onSubmit = (data) => {
        // console.log(data.lead)
        trigger()
        // if (FlagSubmitted === 0) {
        const random = Math.floor(Math.random() * 6)
        const LoginDetails = {
            password: data.confirmPassword,
            username: data.username,
            lead: Lead.lead,
            lead_id: Lead.id,
            lead_name: Lead.name,
            avatar: random
        }
        //Check if username is available
        if (avail.avail === true) {
            if (isObjEmpty(errors)) {
                updateData(LoginDetails)
            }
        }
        // }
        if (FlagSubmitted && Data.LoginDetails) handleResubmit()

    }

    return (
        <>
            <div className='content-header'>
                <h5 className='mb-0'>Finish </h5>
                <small>You are onboarded, now create your credentials to login</small>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)} className="w-100">
                {Lead.lead && <Alert color='info'>
                    <div className='alert-body'>
                        <Info size={15} />{' '}
                        <Label className='text-info'>Your lead is</Label> <br />
                        <span className="ml-2 text-secondary font-weight-bolder">{Lead.name}</span>
                    </div>
                </Alert>}
                <Alert color='primary'>
                    <div className='alert-body'>
                        <Info size={15} />{' '}
                        <span className='ml-1 text-primary font-weight-bold'>Rules for cashmind id creation:</span> <br />
                        <div className=' ml-2 text-sm'>
                            <Label className='text-primary'>Min: 5 character</Label> <br />
                            <Label className='text-primary'>Max: 15 character</Label> <br />
                            <Label className='text-primary'>Ex. cashmind123 | Cash_mind | cash.mind</Label> <br />
                            {/* <strong>Allowed character:</strong> (A-Z), (a-z), (0-9), underscore and dot<br /> */}
                        </div>
                    </div>
                </Alert>
                <Row>
                    <FormGroup tag={Col} md='12'>
                        <Label className='form-label' for={`username-${type}`}>
                            Create your cashmind user id
                        </Label>

                        <Controller
                            name="username"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    className={classnames({ 'is-invalid': errors['username'] }, { 'is-invalid': avail.taken || avail.invalid })}
                                    {...field}
                                    onBlur={e => field.onBlur(handleAvailability(e))}
                                    type='text'
                                    id={`username-${type}`}
                                    placeholder=''
                                />
                            )}
                        />
                        {errors.username && <FormFeedback>{errors.username.message}</FormFeedback>}
                        {avail.taken && !errors.username &&
                            <span className='text-danger'>
                                <XCircle size={15} />{' '}
                                <span className=' text-danger font-weight-bold'>Already taken</span> <br />
                            </span>
                        }
                        {avail.avail && !errors.username &&
                            <span className='text-success'>
                                <CheckCircle size={15} />{' '}
                                <span className=' text-success font-weight-bold'>Available</span> <br />
                            </span>
                        }
                        {avail.invalid && !errors.username &&
                            <span className='text-danger'>
                                <XCircle size={15} />{' '}
                                <span className=' text-danger font-weight-bold'>Invalid</span> <br />
                            </span>
                        }
                    </FormGroup>
                </Row>

                <Row>
                    <FormGroup tag={Col} md='12'>
                        <Label className='form-label' for={`password-${type}`}>
                            Password
                        </Label>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type='password'
                                    id={`password-${type}`}
                                    placeholder='Password'
                                    className={classnames({ 'is-invalid': errors['password'] })}
                                />
                            )}
                        />
                        {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
                    </FormGroup>
                </Row>

                <Row>
                    <FormGroup tag={Col} md='12'>
                        <Label className='form-label' for={`confirmPassword-${type}`}>
                            Confirm Password
                        </Label>
                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type='password'
                                    id={`confirmPassword-${type}`}
                                    placeholder='Confirm Password'
                                    className={classnames({ 'is-invalid': errors['confirmPassword'] })}
                                />
                            )}
                        />
                        {errors.confirmPassword && <FormFeedback>{errors.confirmPassword.message}</FormFeedback>}
                    </FormGroup>
                </Row>

                <div className='d-flex justify-content-between'>
                    <Button.Ripple color='primary' className='btn-prev' onClick={() => stepper.previous()}>
                        <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
                        <span className='align-middle d-sm-inline-block d-none'>Previous</span>
                    </Button.Ripple>

                    <Button.Ripple type='submit' color='primary' className='btn-next'>
                        <span className='align-middle d-sm-inline-block d-none'>Submit</span>
                        <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
                    </Button.Ripple>
                </div>
            </Form>
        </ >
    )
}

export default FinishReferral

