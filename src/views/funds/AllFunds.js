import { useEffect } from 'react'
import { Card, CardBody, CardHeader, Alert, Label, Row, Col } from 'reactstrap'
import { Info } from 'react-feather'
import FundWallet from '../dashboard/FundWallet'
import MainWallet from '../dashboard/MainWallet'
import { updateProfile } from '../../configs/apiConfig'


const AddFunds = () => {
    

    return (
        <Card className="">

            <CardHeader>
                {/* <CardTitle>Add Fund options</CardTitle> */}
            </CardHeader>
            <CardBody className="">
                <Alert color='primary'>
                    <div className='alert-body'>
                        <Info size={22} />{' '}
                        <span className='h4 ml-1 text-primary font-weight-bold'>Available funds</span> <br />
                        <div className=' ml-2 mt-2 text-sm'>
                            <Label className='h6 text-secondary'>Fund wallet is payin wallet & Main wallet is where your daily income gets credited</Label> <br />
                            <Label className='h6 text-danger'>Note: Refresh the page if the amount did not updated automatically</Label> <br />
                        </div>
                        {/* <div className=' ml-2 mt-2 text-sm'>
                            <Label className='h6 text-danger'>Note: Service charge of 2% will be deducted on every payin.</Label> <br />
                        </div> */}
                    </div>
                </Alert>
                {/* <div className="col-md-12 w-100 h-100 d-flex justify-content-center align-items-center">
                    {Loading && <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                        <Spinner type='grow' color="primary" size='lg' />
                    </div>}
                </div> */}
                {/* {!Loading && */}
                <Row className="d-flex justify-content-center">
                    <Col lg='3' sm='6' className="m-1 border-primary rounded">
                        <FundWallet />
                    </Col>
                    <Col lg='3' sm='6' className="m-1 border-primary rounded">
                        <MainWallet />
                        {/* <OrdersReceived kFormatter={kFormatter} warning={colors.warning.main} /> */}
                    </Col>
                </Row>
                {/* } */}
            </CardBody>
        </Card>
        // "hello"
    )
}

export default AddFunds
