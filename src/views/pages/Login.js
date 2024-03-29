import { useState, useContext, useEffect, Fragment } from 'react'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'
import { useDispatch } from 'react-redux'
import { useForm, Controller, set } from 'react-hook-form'
import { toast, Slide } from 'react-toastify'
import { handleLogin } from '@store/actions/auth'
import { AbilityContext } from '@src/utility/context/Can'
import { Link, useHistory } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { getHomeRouteForLoggedInUser, isObjEmpty } from '@utils'
import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee, AlertCircle } from 'react-feather'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// import Spinner from '../../@core/components/spinner/Fallback-spinner'

import {
  Alert,
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Input,
  FormGroup,
  Label,
  CustomInput,
  Button,
  UncontrolledTooltip,
  FormFeedback,
  Spinner
} from 'reactstrap'

import Swal from 'sweetalert2'
import api from '../../configs/apiConfig'
import axios from 'axios'
import '@styles/base/pages/page-auth.scss'

const ToastContent = ({ name, role }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
        <h6 className='toast-title font-weight-bold'>Welcome, {name.split(' ')[0]}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>You have successfully logged in.</span>
    </div>
  </Fragment>
)

const ErrorToast = () => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='danger' icon={<AlertCircle size={12} />} />
        <h6 className='toast-title font-weight-bold'>Login failed</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>Invalid username or password</span>
    </div>
  </Fragment>
)

const NetworkErrorToast = () => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='danger' icon={<AlertCircle size={12} />} />
        <h6 className='toast-title font-weight-bold'>Network issue</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>Please check your network connection</span>
    </div>
  </Fragment>
)

const LoginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().min(6, "Minimum 6 characters required").required("Password is required")
})

const Login = props => {

  const { register, handleSubmit, control, setValue, getValues, formState: { errors }, trigger } = useForm({
    mode: "onBlur",
    resolver: yupResolver(LoginSchema)
  })

  const [skin, setSkin] = useSkin()
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [Loading, setLoading] = useState(false)

  // const { register, errors, handleSubmit } = useForm()
  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  // useEffect(() => {

  //   console.log(username)
  //   console.log(password)
  // }, [])

  const handleForgotPassword = () => {
    Swal.fire({
      title: 'Enter your registered email',
      icon: 'info',
      input: 'email',
      inputAttributes: {
        autocapitalize: 'off'
      },
      confirmButtonText: 'Reset Password',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      customClass: {
        confirmButton: 'btn btn-primary ',
        cancelButton: 'ml-sm-1 btn btn-danger'
      },
      preConfirm: (email) => {
        return axios.get(`${api.routes.get.password_reset_link}/${email}`)
          .then(response => {
            // console.log(response)
            if (!response.data.success) {
              Swal.showValidationMessage(
                `Request failed: ${response.data.message}`
              )
              // throw new Error(response.data.message)
            }
            Swal.fire('Password reset accepted!', 'Kindly check your inbox for password reset link', 'success')
          })
          .catch(error => {
            console.log(error)
            Swal.showValidationMessage(
              `Email not registered with us`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url
        })
      }
    })
  }

  const onSubmit = data => {
    trigger()
    setLoading(true)
    if (isObjEmpty(errors)) {
      useJwt
        .login({ username: data.username, password: data.password })
        .then(res => {
          setLoading(false)
          // console.log(res)
          if (res.data.blocked) Swal.fire('Please Complete your KYC', 'Kindly contact us for more details', 'error')
          else if (!res.data.success) Swal.fire('Login failed!', 'Invalid username or password', 'error')
          else {
            const data = { ...res.data[0].user, accessToken: res.data[0].token, refreshToken: res.data.refreshToken }
            // console.log(res.data)
            dispatch(handleLogin(data))
            // data.push({ role: "admin" })
            // ability.update({ action: "manage", subject: "all" })
            // history.push(getHomeRouteForLoggedInUser("admin"))
            // useJwt.setAcc
            history.push('/home')
            toast.success(
              <ToastContent name={data.fullname || data.username || 'John Doe'} />,
              { transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
          }
        })
        .catch(err => {
          // console.log(err)
          // if (err.data.blocked) Swal.fire('You are blocked by cashmind', 'Kindly contact us for more details', 'error')
          // else Swal.fire('Network issue', 'Kindly check your network connection', 'error')
          Swal.fire('Network issue', 'Kindly check your network connection', 'error')
          // toast.danger(<ErrorToast />, { transition: Slide, hideProgressBar: true, autoClose: 3000 })
          // console.log(err)
          // < NetworkErrorToast />
        })
    }
  }

  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <svg viewBox='0 0 139 95' version='1.1' height='28'>
            <defs>
              <linearGradient x1='100%' y1='10.5120544%' x2='50%' y2='89.4879456%' id='linearGradient-1'>
                <stop stopColor='#000000' offset='0%'></stop>
                <stop stopColor='#FFFFFF' offset='100%'></stop>
              </linearGradient>
              <linearGradient x1='64.0437835%' y1='46.3276743%' x2='37.373316%' y2='100%' id='linearGradient-2'>
                <stop stopColor='#EEEEEE' stopOpacity='0' offset='0%'></stop>
                <stop stopColor='#FFFFFF' offset='100%'></stop>
              </linearGradient>
            </defs>
            <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
              <g id='Artboard' transform='translate(-400.000000, -178.000000)'>
                <g id='Group' transform='translate(400.000000, 178.000000)'>
                  <path
                    d='M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z'
                    id='Path'
                    className='text-primary'
                    style={{ fill: 'currentColor' }}
                  ></path>
                  <path
                    d='M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z'
                    id='Path'
                    fill='url(#linearGradient-1)'
                    opacity='0.2'
                  ></path>
                  <polygon
                    id='Path-2'
                    fill='#000000'
                    opacity='0.049999997'
                    points='69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325'
                  ></polygon>
                  <polygon
                    id='Path-2'
                    fill='#000000'
                    opacity='0.099999994'
                    points='69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338'
                  ></polygon>
                  <polygon
                    id='Path-3'
                    fill='url(#linearGradient-2)'
                    opacity='0.099999994'
                    points='101.428699 0 83.0667527 94.1480575 130.378721 47.0740288'
                  ></polygon>
                </g>
              </g>
            </g>
          </svg>
          <h2 className='brand-text text-primary ml-1'>Cashmind</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login V2' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>

            <CardTitle tag='h2' className='font-weight-bold mb-1 mt-5'>
              Welcome to Cashmind! 👋
            </CardTitle>
            <Alert color="primary">
              <CardText className='mb-2 alert-body'>Please sign-in to your account and start the adventure</CardText>
            </Alert>

            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  Username
                </Label>
                <Input
                  name="username"
                  type='text'
                  id={`login-username`}
                  className={classnames({ 'is-invalid': errors['username'] })}
                  {...register('username')}
                  placeholder=''
                // onChange={e => setUsername(e.target.value)}
                />
                {errors.username && <FormFeedback>{errors.username.message}</FormFeedback>}

              </FormGroup>
              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  <Link to='#' onClick={handleForgotPassword}>
                    <small>Forgot Password?</small>
                  </Link>
                </div>

                <Input
                  name="password"
                  type='password'
                  id={`login-password`}
                  className={classnames({ 'is-invalid': errors['password'] })}
                  {...register('password')}
                  placeholder=''
                // onChange={e => setPassword(e.target.value)}
                />

                {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <CustomInput type='checkbox' className='custom-control-Primary' id='remember-me' label='Remember Me' />
              </FormGroup>
              <Button.Ripple type='submit' color='primary' block disabled={Loading}>
                {Loading ? <>
                  <Spinner color='white' size='sm' type='grow' />
                  <span className='ml-50'>Signing in...</span>
                </> : 'Sign in'}
              </Button.Ripple>
            </Form>
            <p className='text-center mt-2'>
              <span className='mr-25'>New on our platform?</span>
              <Link to='/signup'>
                <span>Create an account</span>
              </Link>
            </p>

          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
