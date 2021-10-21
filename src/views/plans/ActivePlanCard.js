// ** Reactstrap
import { Card, CardHeader, CardBody, Badge, UncontrolledTooltip, Button } from 'reactstrap'

const ActivePlanCard = ({ plan }) => {
  return (
    <Card className='col-md-4 border-primary'>
      <CardHeader className='d-flex justify-content-between align-items-center pt-75 pb-1'>
        <h5 className='mb-0'>Current Plan</h5>
        <Badge id='plan-expiry-date' color='light-secondary'>
          July 22, {new Date().getFullYear()}
        </Badge>
        <UncontrolledTooltip placement='top' target='plan-expiry-date'>
          Expiry Date
        </UncontrolledTooltip>
      </CardHeader>
      <CardBody>
        {/* <Badge className='text-capitalize' color='light-primary'>
          {console.log(selectedUser)}
          {selectedUser !== null ? selectedUser.plan : 'Basic'}
        </Badge> */}
        <ul className='list-unstyled my-1'>
          <li>
            <span className='h4 align-middle font-weight-bold'>Rs. 1000</span>
          </li>
          <li className='my-25'>
            <span className='align-middle'><strong>Joining:</strong> June 21, 2021</span>
          </li>
          <li className='my-25'>
            <span className='align-middle'><strong>Daily Income:</strong> 25 Rs/Day</span>
          </li>
          <li>
            <span className='align-middle'><strong>Withdraw Limit:</strong>Rs 500</span>
          </li>
        </ul>
        {/* <Button.Ripple className='text-center' color='primary' block>
          Upgrade Plan
        </Button.Ripple> */}
      </CardBody>
    </Card>
  )
}

export default ActivePlanCard
