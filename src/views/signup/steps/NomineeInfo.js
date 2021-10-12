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

const SignupSchema = yup.object().shape({
  name: yup.string().required("Nominee name is required"),
  relation: yup.object().required("Relation is required").nullable(),
  mobile: yup.string().required("Mobile no. is required").min(10, 'Enter a valid mobile no.'),
  aadhar: yup.string().required("Aadhar no. is required")

})
// password: yup.string().required("Password is required"),
// confirmPassword: yup
//   .string()
//   .required()
//   .oneOf([yup.ref(password), null], 'Passwords must match')

const NomineeInfo = ({ updateData, Data, stepper, type }) => {

  const { register, handleSubmit, control, setValue, getValues, formState: { errors }, trigger } = useForm({
    mode: "onBlur",
    resolver: yupResolver(SignupSchema)
  })

  const relationOptions = [
    { value: 'Father', label: 'Father' },
    { value: 'Mother', label: 'Mother' },
    { value: 'Husband', label: 'Husband' },
    { value: 'Brother', label: 'Brother' },
    { value: 'Sister', label: 'Sister' },
    { value: 'Friend', label: 'Friend' },
    { value: 'Uncle', label: 'Uncle' },
    { value: 'Aunty', label: 'Aunty' },
    { value: 'Other', label: 'Other' }
  ]

  const onSubmit = (data) => {
    trigger()
    const NomineeData = {
      nominee_name: data.name,
      nominee_relation: data.relation.value,
      nominee_mobile: data.mobile,
      nominee_aadhar: data.aadhar
    }
    if (isObjEmpty(errors)) {
      updateData(NomineeData)
      stepper.next()
    }
  }

  return (
    <>
      <div className='content-header'>
        <h5 className='mb-0'>Nominee Info</h5>
        <small>Enter Your Nomination Details</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)} className="w-100">
        <Row>
          <FormGroup tag={Col} md='12'>
            <Label className='form-label' for={`first-name-${type}`}>
              Nominee Name
            </Label>
            <Input
              type='text'
              name='name'
              id={`nominee-first-name-${type}`}
              placeholder='First'
              {...register('name')}
              className={classnames({ 'is-invalid': errors['name'] })}
            />
            {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
          </FormGroup>
        </Row>

        <Row>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`relation-${type}`}>
              Relation
            </Label>
            <Controller
              name="relation"
              control={control}
              render={({ field }) => (
                <Select
                  // defaultValue={options[0]}
                  {...field}
                  isClearable // enable isClearable to demonstrate extra error handling
                  isSearchable={false}
                  className={classnames({ 'is-invalid': errors['relation'] })}
                  classNamePrefix="select"
                  options={relationOptions}
                />
              )}
            />
            {errors.relation && <FormFeedback>{errors.relation.message}</FormFeedback>}
          </FormGroup>
        </Row>

        <Row>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`aadhar-${type}`}>
              Nominee Aadhar no.
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
              Nominee Mobile no.
            </Label>
            <Cleave
              className={classnames('form-control', { 'is-invalid': errors['mobile'] })}
              options={{
                blocks: [5, 5]
              }}
              name='mobile'
              id={`nominee-mobile-${type}`}
              placeholder='Mobile no.'
              {...register('mobile')}
            />
            {errors.mobile && <FormFeedback>{errors.mobile.message}</FormFeedback>}
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

export default NomineeInfo

