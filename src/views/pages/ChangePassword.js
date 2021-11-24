/* eslint-disable no-tabs */
import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { ArrowLeft, ArrowRight, CheckCircle, Info, XCircle } from 'react-feather'
import { selectThemeColors, isObjEmpty } from '@utils'
import { Label, FormGroup, Row, Col, Button, Form, Input, Alert, FormFeedback, Card, CardHeader, CardBody, CardTitle, Spinner } from 'reactstrap'

import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import AutoComplete from '@components/autocomplete'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Redirect } from 'react-router'
import api, { updateProfile } from '../../configs/apiConfig'
const PasswordResetSchema = yup.object().shape({
  password: yup.string()
    .min(6, "Minimum 6 characters required")
    .required('Password is required'),
  confirmPassword: yup.string()
    .min(6, "Minimum 6 characters required")
    .required('Enter password again')
    .oneOf([yup.ref('password'), null], "Password does't match")
})

const ChangePassword = () => {

  const { register, handleSubmit, control, setValue, getValues, formState: { errors }, trigger } = useForm({
    mode: "onBlur",
    resolver: yupResolver(PasswordResetSchema)
  })
  const [Loading, setLoading] = useState(false)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    updateProfile()
    setUserData(JSON.parse(localStorage.getItem('userData')))
  }, [])

  const onSubmit = data => {
    const Data = {
      ...data,
      dashboard: true
    }
    trigger()
    setLoading(true)
    if (isObjEmpty(errors)) {
      axios.post(api.routes.post.change_password, Data, api.auth)
        .then(response => {
          setLoading(false)
          // console.log(response)
          if (response.data.success) {
            Swal.fire({
              title: 'Password changed successfully!',
              icon: 'success'
            }).then(() => {
              window.location.reload(false)
            })
            // throw new Error(response.data.message)
          } else {
            Swal.fire({
              title: 'Operation failed!',
              text: response.data.message,
              icon: 'error'
            })
          }
        })
        .catch(error => {
          Swal.fire({
            title: 'Operation failed!',
            text: error.message,
            icon: 'error'
          })
        })
    }
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <FormGroup tag={Col} md='6'>
              <Label className='form-label' for={`password-forgot`}>
                New Password
              </Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type='password'
                    id={`password-forgot`}
                    placeholder='Enter New Password'
                    className={classnames({ 'is-invalid': errors['password'] })}
                  />
                )}
              />
              {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
            </FormGroup>
          </Row>

          <Row>
            <FormGroup tag={Col} md='6'>
              <Label className='form-label' for={`confirmPassword-forgot`}>
                Confirm New Password
              </Label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type='password'
                    id={`confirmPassword-forgot`}
                    placeholder='Confirm Password'
                    className={classnames({ 'is-invalid': errors['confirmPassword'] })}
                  />
                )}
              />
              {errors.confirmPassword && <FormFeedback>{errors.confirmPassword.message}</FormFeedback>}
            </FormGroup>
          </Row>

          <Button.Ripple type='submit' color='primary' disabled={Loading}>
            {Loading ? <>
              <Spinner color='white' size='sm' type='grow' />
              <span className='ml-50'>Processing...</span>
            </> : 'Change Password'}
            <ArrowRight
              size={14}
              className="align-middle ml-sm-25 ml-0"
            ></ArrowRight>
          </Button.Ripple>
        </Form>

      </CardBody>
    </Card>
    // "hello"
  )
}

export default ChangePassword
