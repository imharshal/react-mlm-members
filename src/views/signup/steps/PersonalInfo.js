/* eslint-disable no-tabs */
import { Fragment, useState, useEffect } from 'react'
import Select from 'react-select'
import '@styles/react/libs/react-select/_react-select.scss'
import classnames from 'classnames'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { selectThemeColors, isObjEmpty } from '@utils'
import { Label, FormGroup, Row, Col, Button, Form, Input, FormFeedback } from 'reactstrap'

import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.in'
import InputMask from 'react-input-mask'


//Preserve From state
import { useStateMachine } from "little-state-machine"
import { updateAction, clearAction } from "./updateAction"

const SignupSchema = yup.object().shape({
	firstName: yup.string().required("First name is required"),
	middleName: yup.string().required("Middle name is required"),
	lastName: yup.string().required("Last name is required"),
	dob: yup.date().required("Date of Birth is required").nullable(),
	gender: yup.object().required("Gender is required").nullable(),
	email: yup.string().email().required("Email is required"),
	pancard: yup.string().notRequired().matches(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/i, { message: 'Invalid Pancard no', excludeEmptyString: true }).nullable(),
	mobile: yup.string().required("Mobile no. is required"),
	aadhar: yup.string().required("Aadhar no. is required")
})
// password: yup.string().required("Password is required"),
// confirmPassword: yup
//   .string()
//   .required()
//   .oneOf([yup.ref(password), null], 'Passwords must match')

const PersonalInfo = ({ updateData, resetData, Data, stepper, type }) => {

	const { register, handleSubmit, control, formState: { errors }, trigger } = useForm({
		mode: "onBlur",
		resolver: yupResolver(SignupSchema)
	})

	const { actions, state } = useStateMachine({ updateAction, clearAction })

	const genderOptions = [
		{ value: 'Male', label: 'Male' },
		{ value: 'Female', label: 'Female' },
		{ value: 'Other', label: 'Other' }
	]

	const onSubmit = (data) => {
		trigger()
		const dob = data.dob
		const dateOfBirth = `${dob.getDate()}-${dob.getMonth() + 1}-${dob.getFullYear()}`
		const personalData = {
			fullname: `${data.firstName} ${data.middleName} ${data.lastName}`,
			dob: dateOfBirth,
			gender: data.gender.value,
			email: data.email,
			mobile: data.mobile,
			pancard: (data.pancard) ? data.pancard.toUpperCase() : '',
			aadhar: data.aadhar
		}
		resetData()
		if (isObjEmpty(errors)) {
			updateData(personalData)
			stepper.next()
		}
	}

	return (
		<>
			<div className='content-header'>
				<h5 className='mb-0'>Personal</h5>
				<small>Enter Your Personal Info.</small>
			</div>
			<Form onSubmit={handleSubmit(onSubmit)} className="">
				<Row>
					<FormGroup tag={Col} md='4'>
						<Label className='form-label' for={`first-name-${type}`}>
							First Name
						</Label>
						<Input
							type='text'
							name='firstName'
							id={`first-name-${type}`}
							placeholder='First'
							{...register('firstName')}
							className={classnames({ 'is-invalid': errors['firstName'] })}
						/>
						{errors.firstName && <FormFeedback>{errors.firstName.message}</FormFeedback>}
					</FormGroup>
					<FormGroup tag={Col} md='4'>
						<Label className='form-label' for={`middle-name-${type}`}>
							Middle Name
						</Label>
						<Input
							type='text'
							name='middleName'
							id={`middle-name-${type}`}
							placeholder='Middle'
							{...register('middleName')}
							className={classnames({ 'is-invalid': errors['middleName'] })}
						/>
						{errors.middleName && <FormFeedback>{errors.middleName.message}</FormFeedback>}
					</FormGroup>
					<FormGroup tag={Col} md='4'>
						<Label className='form-label' for={`last-name-${type}`}>
							Last Name
						</Label>
						<Input
							type='text'
							name='lastName'
							id={`last-name-${type}`}
							placeholder='Last'
							{...register('lastName')}
							className={classnames({ 'is-invalid': errors['lastName'] })}
						/>
						{errors.lastName && <FormFeedback>{errors.lastName.message}</FormFeedback>}
					</FormGroup>
				</Row>

				<Row>
					<FormGroup tag={Col} md='6'>
						<Label className='form-label' for={`dob-${type}`}>
							Date of Birth
						</Label>
						<Input
							type='date'
							name='dob'
							id={`dob-${type}`}
							placeholder='Date of Birth'
							{...register('dob')}
							className={classnames({ 'is-invalid': errors['dob'] })}
						/>
						{errors.dob && <FormFeedback>{errors.dob.message}</FormFeedback>}
					</FormGroup>
					<FormGroup tag={Col} md='6'>
						<Label className='form-label' for={`gender-${type}`}>
							Gender
						</Label>
						<Controller
							name="gender"
							control={control}
							render={({ field }) => (
								<Select
									// defaultValue={options[0]}
									{...field}
									isClearable // enable isClearable to demonstrate extra error handling
									isSearchable={false}
									className={classnames({ 'is-invalid': errors['gender'] })}
									classNamePrefix="select"
									options={genderOptions}
								/>
							)}
						/>
						{errors.gender && <FormFeedback>{errors.gender.message}</FormFeedback>}
					</FormGroup>
				</Row>

				<Row>
					<FormGroup tag={Col} md='6'>
						<Label className='form-label' for={`aadhar-${type}`}>
							Aadhar no.
						</Label>
						<Controller
							name="aadhar"
							control={control}
							render={({ field }) => (
								<Cleave
									className={classnames('form-control', { 'is-invalid': errors['aadhar'] })}
									options={{
										blocks: [4, 4, 4]
									}}
									placeholder='Aadhar no.'
									{...field}
								/>
							)}
						/>
						{errors.aadhar && <FormFeedback>{errors.aadhar.message}</FormFeedback>}
					</FormGroup>

					<FormGroup tag={Col} md='6'>
						<Label className='form-label' for={`mobile-${type}`}>
							Mobile no.
						</Label>
						<Cleave
							className={classnames('form-control', { 'is-invalid': errors['mobile'] })}
							options={{
								blocks: [5, 5]
							}}
							// options={{
							// 	phone: true,
							// 	phoneRegionCode: 'IN'
							// }}
							name='mobile'
							id={`mobile-${type}`}
							placeholder='Mobile no.'
							{...register('mobile')}
						/>
						{errors.mobile && <FormFeedback>{errors.mobile.message}</FormFeedback>}
					</FormGroup>
				</Row>

				<Row>
					<FormGroup tag={Col} md='4'>
						<Label className='form-label' for={`pancard-${type}`}>
							Pancard
						</Label>
						<Controller
							name="pancard"
							control={control}
							render={({ field }) => (
								<InputMask
									className={classnames('form-control', 'text-uppercase', { 'is-invalid': errors['pancard'] })}
									control={control}
									alwaysShowMask={false}
									formatChars={{
										9: '[0-9]',
										A: '[A-Za-z]'
									}}
									mask="AAAAA9999A"
									placeholder='Pancard no.'
									{...field}
								/>
							)}
						/>
						{/* <Controller
							as={InputMask}
							control={control}
							mask="aaaaa9999a"
							name="pancard"
						/> */}
						{/* <Cleave
							className={classnames('form-control', { 'is-invalid': errors['pancard'] })}
							options={{ delimiter: '', blocks: [10], uppercase: true }}
							name='pancard'
							id={`pancard-${type}`}
							placeholder='Pancard'
							{...register('pancard')}
						/> */}
						{/* <Input
							type='text'
							name='pancard'
							id={`pancard-${type}`}
							placeholder='Pancard'
							{...register('pancard')}
							className={classnames({ 'is-invalid': errors['pancard'] })}
						/> */}
						{errors.pancard && <FormFeedback>{errors.pancard.message}</FormFeedback>}
					</FormGroup>
					<FormGroup tag={Col} md='8'>
						<Label className='form-label' for={`email-${type}`}>
							Email
						</Label>
						<Input
							type='email'
							name='email'
							id={`email-${type}`}
							placeholder='Email'
							{...register('email')}
							className={classnames({ 'is-invalid': errors['email'] })}
						/>
						{errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
					</FormGroup>
				</Row>

				<div className='d-flex justify-content-between'>
					<Button.Ripple color='primary' className='btn-prev' onClick={() => stepper.previous()}>
						<ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
						<span className='align-middle d-sm-inline-block d-none'>Previous</span>
					</Button.Ripple>

					<Button.Ripple type='submit' color='primary' className='btn-next'>
						<span className='align-middle d-sm-inline-block d-none'>Next</span>
						<ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
					</Button.Ripple>
				</div>
			</Form>
		</ >
	)
}

export default PersonalInfo

