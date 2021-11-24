import { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col, Button, Card, CardHeader, CardTitle, CardBody, Media, CardText, Alert, Label, Input } from 'reactstrap'
import { Link } from 'react-router-dom'

import { DollarSign, Plus, Upload } from 'react-feather'
import { updateProfile } from '../../configs/apiConfig'

const MainWallet = ({ kFormatter }) => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    updateProfile()
    setUserData(JSON.parse(localStorage.getItem('userData')))
  }, [])

  return (
    <Card className='text-center'>
      <CardBody className="col">
        <div className={`avatar p-50 m-0 mb-1 bg-light-primary`}>
          <div className='avatar-content'><DollarSign /></div>
        </div>
        <h2 className='font-weight-bolder'>Rs {userData && userData['main_wallet']}</h2>
        <p className='card-text line-ellipsis'>Main Wallet</p>
        <Link to={`/withdraw-funds`}>
          <Button.Ripple className="mt-5" color='primary' >
            IMPS Withdraw
            <Download size={14} className='align-middle ml-sm-25 ml-0'></Download>
          </Button.Ripple>
        </Link>
        {/* <Link to={`/withdraw-funds`}>
          <Button.Ripple className="mt-5" color='primary' >
            IMPS Withdraw
            <Upload size={14} className='align-middle ml-sm-25 ml-0'></Upload>
          </Button.Ripple>
        </Link> */}
      </CardBody>
    </Card>)
}

export default MainWallet
