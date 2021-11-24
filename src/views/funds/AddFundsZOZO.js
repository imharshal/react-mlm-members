import { Row, Col, Card, CardBody, CardHeader, CardTitle, Alert, Label, Spinner } from 'reactstrap'
import { Info } from 'react-feather'
import React, { useState, useEffect } from 'react'

import axios from 'axios'
import api from '@configs/apiConfig'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom'
import upi_apps from '@src/assets/images/icons/upi_apps.png'
import upi_apps_horizontal from '@src/assets/images/icons/upi_apps_horizontal.png'

// axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*'
// axios.defaults.headers.get['Accept'] = 'application/xml'

// import AllPlansCard from './AllPlansCard'
// import ActivePlanCard from './ActivePlanCard'

const AddFunds = () => {
    const [avail, setAvail] = useState([{ taken: true, avail: false, invalid: false }])

    const [PaymentOptions, setPaymemtOptions] = useState([])
    const [Loading, setLoading] = useState(true)

    const getPaymentOptions = () => {
        try {
            axios
                .get(api.routes.get.payment_options, api.auth)
                //     // .then(response => console.log([response.data]))
                .then(response => {
                    setLoading(false)
                    setPaymemtOptions(response.data)
                })

        } catch (e) {
            console.log(e)
            setLoading(false)
            // MyAlert.fire('Invalid Request', 'Kindly relogin to fix this issue', 'error')
        }
    }

    useEffect(() => {
        if (Loading) getPaymentOptions()
        const interval = setInterval(() => {
            getPaymentOptions()
            console.log('This will run every 3minutes!')
        }, 3 * 60000)
        // }, 1000)
        return () => clearInterval(interval)

        // setUser(selectedUser)
    }, [])

    // setInterval(function () {
    //     getPaymentOptions()
    // }, 3 * 60000)

    return (
        <Card className="">

            <CardHeader>
                {/* <CardTitle>Add Fund options</CardTitle> */}
            </CardHeader>
            <CardBody className="">
                <Alert color='primary'>
                    <div className='alert-body'>
                        <Info size={22} />{' '}
                        <span className='h4 ml-1 text-primary font-weight-bold'>You can use any of the option to add funds</span> <br />
                        <div className=' ml-2 mt-2 text-sm'>
                            <Label className='h6 text-secondary'>After successful payment your account will be credited with respected amount within 3 minutes</Label> <br />
                        </div>
                        <div className=' ml-2 mt-2 text-sm'>
                            <Label className='h6 text-danger'>Note: Service charge of 2% will be deducted on every payin.</Label> <br />
                        </div>
                    </div>
                </Alert>
                <div className="col-md-12 w-100 h-100 d-flex justify-content-center align-items-center">
                    {Loading && <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                        <Spinner type='grow' color="primary" size='lg' />
                    </div>}
                </div>
                {!Loading &&
                    <Row>
                        <Col md="5" sm="12"  >

                            <Card className='plan-card border-primary d-lg-none d-md-none' >
                                <CardHeader className='d-flex justify-content-between align-items-center pt-75 pb-1'>
                                    <h3 className='mb-2 text-primary'>Upi app</h3>
                                </CardHeader>
                                <CardBody className="ml-md-1">
                                    <Row className="mb-2">
                                        {/* <Col className="h5 col-md-4">Upi app</Col> */}
                                        <Col className="d-flex justify-content-center">
                                            <Link to={`${PaymentOptions.upi}`}>
                                                <button type="button" className="btn btn-primary">
                                                    <img src="https://img.icons8.com/fluency/48/000000/bhim.png" className="text-white"></img>UPI Pay
                                                    {/* <img src="https://img.icons8.com/fluency/48/000000/bhim.png"/> */}
                                                </button>
                                            </Link>
                                        </Col>
                                    </Row>

                                </CardBody>
                            </Card>

                            <Card className='plan-card border-primary' >
                                <CardHeader className='d-flex justify-content-between align-items-center pt-75 pb-1'>
                                    <h3 className='mb-2 text-primary'>Bank Transfer</h3>

                                </CardHeader>
                                <CardBody className="ml-md-1">
                                    <Row className="mb-2">
                                        <Col className="h4 col-md-4 col-12 font-weight-bolder">Account holder.:</Col>
                                        <Col className="h4"> Cashmind</Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col className="h4 col-md-4 col-12 font-weight-bolder">Account no.:</Col>
                                        <Col className="h4"> {PaymentOptions.acno}</Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col className="h4 col-md-4 col-12 font-weight-bolder">IFSC:</Col>
                                        <Col className="h4"> {PaymentOptions.ifsc}</Col>
                                    </Row>
                                </CardBody>
                            </Card>

                        </Col>

                        {/* <Link to={PaymentOptions.upi}> Pay</Link> */}
                        <Col md="7" sm="12"  >
                            <Card className='plan-card border-primary' >
                                <CardHeader className=' pt-75 pb-1 text-primary'>
                                    <span className='h3  d-inline text-primary'>Scan QR  </span>
                                    <span className=' text-info font-weight-bold'><Info size={22} />{' '}Refreshes every 3 minutes</span> <br />
                                </CardHeader>
                                <CardBody className="container">
                                    <div className='d-flex justify-content-around w-100'>

                                        {/* {PaymentOptions && parse(String(PaymentOptions.qr))} */}
                                        <img className='img-fluid ' src={`data:image/svg+xml;utf8,${encodeURIComponent(String(PaymentOptions.qr))}`} alt='Payment QR' />
                                        <img className='img-fluid w-50 ml-1 d-none d-md-inline-flex d-lg-inline' src={`${upi_apps}`}></img>
                                    </div>
                                    <img className='img-fluid w-100 mt-1 d-block d-md-none d-lg-none' src={`${upi_apps_horizontal}`}></img>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                }
            </CardBody>
        </Card>
        // "hello"
    )
}

export default AddFunds
