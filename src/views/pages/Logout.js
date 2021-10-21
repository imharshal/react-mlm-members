import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import errorImg from '@src/assets/images/pages/error.svg'
import Spacer from "react-spacer"
import '@styles/base/pages/page-misc.scss'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/actions/auth'

const Error = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(handleLogout())
    window.location = "/login"

  }, [])
  return ("You are logged out")
}
export default Error
