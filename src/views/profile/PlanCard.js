// ** Reactstrap
import { Card, CardHeader, CardBody, Badge, UncontrolledTooltip, Button } from 'reactstrap'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import api, { getUserId } from '../../configs/apiConfig'
const PlanCard = ({ selectedUser }) => {
  const [CurrentPlan, setCurrentPlan] = useState([])
  useEffect(() => {
    axios
      .get(`${api.routes.get.active_plan}/${getUserId()}`, api.auth)
      .then(response => {
        if (response.data.success) setCurrentPlan(response.data.data)
        // console.log(response)
      })
      .catch(error => {
        Swal.fire('No plan active!', 'Kindly purchase any plan to get more services', 'info')

      })

  }, [])

  return (
    <>
      {CurrentPlan && CurrentPlan.validity && <Card Card className='plan-card border-primary' >
        <CardHeader className='d-flex justify-content-between align-items-center pt-75 pb-1'>
          <h5 className='mb-0'>Current Plan</h5>
          <Badge id='plan-expiry-date' color='light-secondary'>
            {CurrentPlan.validity}
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
              <span className='h4 align-middle font-weight-bold'>Rs. {CurrentPlan.price}</span>
            </li>
            <li className='my-25'>
              <span className='align-middle'><strong>Joining:</strong> {CurrentPlan.joining}</span>
            </li>
            <li className='my-25'>
              <span className='align-middle'><strong>Daily Income:</strong> {CurrentPlan.daily_income} Rs/Day</span>
            </li>
            <li>
              <span className='align-middle'><strong>Withdraw Limit:</strong>Rs {CurrentPlan.withdraw_limit}</span>
            </li>
          </ul>
          {/* <Button.Ripple className='text-center' color='primary' block>
          Upgrade Plan
        </Button.Ripple> */}
        </CardBody>
      </Card>}
    </>
  )
}

export default PlanCard
