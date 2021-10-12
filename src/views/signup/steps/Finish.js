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
    lead: yup.string().required("Enter valid referrer or enter admin ").matches(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm, 'This is not a valid cashmind id'),
    username: yup.string().required("It is required to create cashmind id").matches(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm, 'This id does\'t meet our criteria'),
    // password: yup.string().required("Password is required"),
    // confirmPassword: yup.object().required().oneOf([yup.ref(password), null], 'Passwords must match')

    password: yup.string()
        .required('Password is required'),
    confirmPassword: yup.string()
        .required('Enter password again')
        .oneOf([yup.ref('password'), null], "Password does't match")
})

const FinishStep = ({ updateData, Data, resetData, stepper, type }) => {

    const { register, handleSubmit, control, setValue, getValues, formState: { errors }, trigger } = useForm({
        mode: "onBlur",
        resolver: yupResolver(SignupSchema)
    })
    const [Lead, setLead] = useState([])

    const [FlagSubmitted, setFlagSubmitted] = useState(0)

    const [LeadList, setLeadList] = useState([{ username: '', fullname: '' }])

    const [avail, setAvail] = useState([{ taken: true, avail: false, invalid: false }])

    useEffect(() => {
        axios
            .get(api.routes.get.member_list)
            .then(response => setLeadList(response.data))
        // console.log(LeadList)
    }, [LeadList])

    // TODO
    const handleAvailability = (e) => {
        try {
            axios.post(api.routes.get.member_list, Data)
                .then(response => {
                    // console.log(response)
                    if (response.success === "true") {
                        const selected = response.data.filter(x => x.username === e.target.value)
                        // console.log(selected.length)
                        if (selected.length > 0) setAvail({ taken: true })
                        else setAvail({ avail: true })
                    } else { alert('Something wents wrong') }
                }).catch(error => {
                    alert('Please check your internet connection')
                })
        } catch (e) { alert('Please check your internet connection') }
    }
    // const handleChangeUserName = (e) => {
    //     if (e.target.value.match("^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$") !== null) {
    //         setUserName(e.target.value)
    //     }
    // }

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
        }).then(() => { //window.location = "/login"
        })
    }
    const handleError = () => {
        return MyAlert.fire({
            title: 'Failed to Register',
            text: 'Please try again',
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
                axios.post(api.routes.post.signup, Data)
                    .then(response => {
                        console.log(response)
                        if (response.status === 200) handleSuccess()
                        else handleError()
                    })
            }
            if (result.isDismissed || result.isDenied) {
                location.reload()
            }
        })
    }
    const handleResubmit = () => {
        return MyAlert.fire({
            title: 'Resubmission is not allowed',
            text: '',
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

    const signup = () => {
        setFlagSubmitted(FlagSubmitted + 1)
        try {

            axios.post(api.routes.post.signup, Data)
                .then(response => {
                    console.log(response)
                    if (response.status >= 200 <= 250) handleSuccess()
                    else handleError()
                }).catch(error => {
                    console.log(error)
                    handleError()
                })
        } catch (e) { handleError() }
        // resetData()
    }

    useEffect(() => {
        console.log(Lead)
    }, [Lead])

    useEffect(() => {
        console.log(Data)
        setFlagSubmitted(0)
        if (!FlagSubmitted && Data.username) signup()
    }, [Data])

    const onSubmit = (data) => {
        console.log(data.lead)
        trigger()
        if (FlagSubmitted === 0) {
            const LoginDetails = {
                password: data.confirmPassword,
                username: data.username,
                lead: Lead.username,
                lead_name: Lead.name
            }
            //Check if username is available
            if (avail.avail === true) {
                if (isObjEmpty(errors)) {
                    updateData(LoginDetails)
                }
            }
        }
        if (FlagSubmitted && Data.LoginDetails) handleResubmit()

    }

    return (
        <>
            <div className='content-header'>
                <h5 className='mb-0'>Finish </h5>
                <small>You are onboarded, now create your credentials to login</small>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)} className="w-100">
                <Row>
                    <FormGroup tag={Col} md='12'>
                        <Label className='form-label' for={`lead-${type}`}>
                            Who referred you?
                        </Label>

                        <Controller
                            name="lead"
                            control={control}
                            render={({ field }) => (
                                <AutoComplete
                                    // onChange={(event, value) => handleLeadChange(event, value)} // prints the selected value
                                    // name="lead"
                                    {...field}
                                    id={`lead-${type}`}
                                    // onInput={(e) => console.log(e.target.value)}
                                    suggestions={LeadList}
                                    className='form-control'
                                    filterKey='username'
                                    placeholder="Cashmind username"
                                    // {...register('lead')}

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
                                                onSuggestionItemClick(null, e)
                                                setLead({ lead: e.target.ariaSelected, name: e.target.ariaLabel })
                                            }}
                                            aria-selected={suggestion.username}
                                            aria-label={suggestion.name}
                                        >
                                            <Row>
                                                <Col md={4} aria-selected={suggestion.username} aria-label={suggestion.name}>
                                                    <span className="badge badge-primary" aria-selected={suggestion.username} aria-label={suggestion.name}>{`@ ${suggestion.username}`}</span>
                                                </Col>
                                                <Col md={8} className="mt-md-0 mt-1" aria-selected={suggestion.username} aria-label={suggestion.name}>
                                                    <span className="" aria-selected={suggestion.username} aria-label={suggestion.name}>{suggestion.name}</span>
                                                </Col>{/* <hr className="m-0 p-0"/> */}
                                            </Row>
                                        </li>
                                    )}
                                />
                            )}
                        />
                        {errors.lead && <Label className="text-danger">{errors.lead.message}</Label>}
                    </FormGroup>
                </Row>
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
                        <Input
                            name="username"
                            {...register('username')}
                            onBlur={handleAvailability}
                            // value={UserName}
                            // onChange={handleChangeUserName}
                            type='text'
                            id={`username-${type}`}
                            placeholder=''
                            className={classnames({ 'is-invalid': errors['username'] }, { 'is-invalid': avail.taken || avail.invalid })}
                        />
                        {/* <Controller
                            name="username"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    // {...field}
                                    onBlur={handleAvailability}
                                    type='text'
                                    id={`username-${type}`}
                                    placeholder=''
                                    className={classnames({ 'is-invalid': errors['username'] })}
                                />
                            )}
                        /> */}
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
                    {/* <Button.Ripple color='primary' className='btn-prev' onClick={() => setAvail({ avail: true })}>
                        <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
                        <span className='align-middle d-sm-inline-block d-none'>Avail</span>
                    </Button.Ripple> */}
                    <Button.Ripple type='submit' color='primary' disabled={Boolean(FlagSubmitted)} className='btn-next'>
                        <span className='align-middle d-sm-inline-block d-none'>Next</span>
                        <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
                    </Button.Ripple>
                </div>
            </Form>
        </ >
    )
}

export default FinishStep

