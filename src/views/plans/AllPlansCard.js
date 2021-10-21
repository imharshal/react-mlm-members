// ** Reactstrap
import { Fragment } from 'react'
import { Card, Row, CardHeader, CardBody, Col, Badge, UncontrolledTooltip, Button } from 'reactstrap'

const AllPlansCard = ({ plans }) => {

  return (
    // console.log(plans),
    <Fragment>
      {plans.map((plan, index) => {
        return (
          <Col md="3" sm="12" key={index} >
            <Card className='plan-card border-primary' key={index}>
              <CardHeader className='d-flex justify-content-between align-items-center pt-75 pb-1'>
                <h2 className='mb-0'>{`Rs ${plan.price}`}</h2>
                <Badge id='plan-expiry-date' color='light-secondary'>
                  {`${plan.expiry} days`}
                </Badge>
                <UncontrolledTooltip placement='top' target='plan-expiry-date'>
                  Validity (in days)
                </UncontrolledTooltip>
              </CardHeader>
              <CardBody>
              
                <ul className='list-unstyled my-1 mb-5'>

                  <li className='my-25'>
                    <span className='align-middle'><strong>Daily Income:</strong> {plan.daily_income} Rs/Day</span>
                  </li>

                </ul>
                <Button.Ripple className='text-center' color='primary' block>
                  Select Plan
                </Button.Ripple>
              </CardBody>
            </Card>
          </Col>
        )
      })}
    </Fragment>
  )
}

export default AllPlansCard
