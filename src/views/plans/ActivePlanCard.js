// ** Reactstrap
import { Card, CardHeader, CardBody, Badge, UncontrolledTooltip, Button } from 'reactstrap'

const ActivePlanCard = ({ plan }) => {
  return (
    <Card className='col-md-4 bg-primary text-white'>
      <CardHeader className=' d-flex justify-content-between align-items-center pt-75 pb-1'>
        <h4 className='mb-0 text-white font-weight-bold'>Current Plan</h4>
        <Badge id='plan-expiry-date' color='light-primary' className="bg-white">
          Valid till: {plan.validity}
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
            <span className='h4 align-middle font-weight-bold text-white'> Rs {plan.price}</span>
          </li>
          <li className='my-25'>
            <span className='align-middle'><strong>Joining:</strong> {plan.joining}</span>
          </li>
          <li className='my-25'>
            <span className='align-middle'><strong>Daily Income:</strong> {plan.daily_income} Rs/Day</span>
          </li>
          <li>
            <span className='align-middle'><strong>Withdraw Limit:</strong> Rs {plan.withdraw_limit}</span>
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
