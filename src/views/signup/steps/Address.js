/* eslint-disable no-tabs */
import { Fragment, useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight } from 'react-feather'
import classnames from 'classnames'
import { Label, FormGroup, Row, Col, Input, Form, Button, FormFeedback } from 'reactstrap'
import { selectThemeColors, isObjEmpty } from '@utils'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Cleave from 'cleave.js/react'
import axios from 'axios'

const SignupSchema = yup.object().shape({
  // Address: yup.array().of(yup.object().shape({
  //   address: yup.string().required("Address is required")
  // })),
  // address: yup.string().required('Address is required'),
  pincode: yup.string().required("Pin code is required").min(7, 'Invalid Pincode')
  // city: yup.string().required("City is required"),
  // district: yup.string().required("District is required"),
  // state: yup.string().required("State is required").nullable(),
  // country: yup.string().required("Country is required").nullable()
})


const Address = ({ updateData, Data, stepper, type }) => {

  const { register, handleSubmit, control, setValue, getValues, formState: { errors }, trigger } = useForm({
    mode: "onBlur",
    resolver: yupResolver(SignupSchema)
  })
  const [invalidPincode, setinvalidPincode] = useState(false)

  const handleAddress = async (e) => {
    try {
      const pincode = e.target.value.replace(/\s+/g, '')
      let addr = {
        pincode: '', city: '', district: '', state: '', country: ''
      }

      if (pincode.length === 6) {

        // fetch(`https://api.postalpincode.in/pincode/${pincode}`)
        //   .then(response => response.json())
        //   .then(data => console.log(data))

        fetch(`https://api.postalpincode.in/pincode/${pincode}`)
          .then(response => response.json())
          .then(results => {
            const data = results[0].PostOffice
            if (data) addr = {
              pincode: data[1].Pincode,
              city: data[1].Block,
              town: data[1].town,
              district: data[1].District,
              state: data[1].State,
              country: data[1].Country
            }
            if (data === null) setinvalidPincode(true)
            else setinvalidPincode(false)

            setValue('Address', addr)
          })
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onSubmit = (data) => {
    if (data.Address.city !== '') {
      trigger()
      data.Address['town'] = data.town
      if (isObjEmpty(errors)) {
        updateData(data.Address)
        stepper.next()
      }

    } else errors.pincode = 'Invalid Pincode'
  }


  return (
    <div className="w-100">
      <div className='content-header'>
        <h5 className='mb-0'>Address</h5>
        <small>Enter Your Address.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)} className="w-100">
        <Row>
          <FormGroup tag={Col} md='12'>
            <Label className='form-label' for={`address-${type}`}>
              Address
            </Label>
            <Controller
              name="Address.address"
              control={control}
              render={({ field }) => (
                <Input
                  className={classnames('form-control', { 'is-invalid': errors['address'] })}
                  type='textarea'
                  id={`address-${type}`}
                  placeholder='Address'
                  {...field}
                />
              )}
            />
            {errors.address && <FormFeedback>{errors.address.message}</FormFeedback>}
          </FormGroup>
        </Row>

        <Row>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`town-${type}`}>
              Town
            </Label>
            <Controller
              name="town"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  id={`town-${type}`}
                  placeholder='Town'
                  {...field}
                />
              )}
            />
            {errors.town && <FormFeedback>{errors.town.message}</FormFeedback>}
          </FormGroup>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`pincode-${type}`}>
              Pin Code
            </Label>
            <Controller
              name="pincode"
              control={control}
              render={({ field }) => (
                <Cleave
                  className={classnames('form-control', { 'is-invalid': errors['pincode'] }, { 'is-invalid': invalidPincode })}
                  options={{
                    blocks: [3, 3]
                  }}
                  id={`pincode-${type}`}
                  placeholder='Pincode'
                  {...field}
                  onInput={handleAddress}
                />
              )}
            />
            {errors.pincode && <FormFeedback>{errors.pincode.message}</FormFeedback>}
            {(invalidPincode) && !errors.pincode && <FormFeedback>Invalid Pincode</FormFeedback>}
          </FormGroup>
        </Row>

        <Row>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`city-${type}`}>
              City
            </Label>
            <Controller
              name="Address.city"
              control={control}
              render={({ field }) => (
                <Input
                  id={`city-${type}`}
                  placeholder='City'
                  disabled={true}
                  {...field}
                />
              )}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`district-${type}`}>
              District
            </Label>
            <Controller
              name="Address.district"
              control={control}
              render={({ field }) => (
                <Input
                  id={`district-${type}`}
                  placeholder='District'
                  disabled={true}
                  {...field}
                />
              )}
            />
          </FormGroup>
        </Row>

        <Row>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`state-${type}`}>
              State
            </Label>
            <Controller
              name="Address.state"
              control={control}
              render={({ field }) => (
                <Input
                  id={`state-${type}`}
                  placeholder='State'
                  disabled={true}
                  {...field}
                />
              )}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`country-${type}`}>
              Country
            </Label>
            <Controller
              name='Address.country'
              control={control}
              render={({ field }) => (
                <Input
                  name='country'
                  id={`country-${type}`}
                  placeholder='Country'
                  disabled={true}
                  {...field}
                />
              )}
            />
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
          {/* <Button.Ripple color='primary' className='btn-next' onClick={() => stepper.next()}>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
          </Button.Ripple> */}
        </div>
      </Form>
    </div>
  )
}

export default Address
