// ** Reactstrap
import { Fragment } from 'react'
import { Card, Row, CardHeader, CardBody, Col, Badge, UncontrolledTooltip, Button } from 'reactstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios'
import api from '../../configs/apiConfig'
const MyAlert = withReactContent(Swal)

const AllPlansCard = ({ plans }) => {
  const handlePlanPurchase = (plan_id) => {
    const member = JSON.parse(localStorage.getItem('userData'))
    const Data = {
      member_id: member['id'],
      plan_id
    }
    const plan_details = plans.filter(x => x.plan_id === plan_id)[0]
    // console.log(plan_details)

    MyAlert.fire({
      title: 'Are you sure to purchase this plan?',
      text: 'The amount will be deducted from your fund account',
      icon: 'info',
      showCancelButton: 'No, Cancel',
      confirmButtonText: 'Yes',

      customClass: {
        cancelButton: 'ml-2 btn btn-danger',
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log(Data)
        axios
          .post(api.routes.post.purchase_plan, Data, api.auth)
          .then(response => {
            // console.log(response)
            if (response.data.success === true) {
              MyAlert.fire({
                title: 'Congratulations!',
                text: `Package Rs ${plan_details.price} purchased successfully \n Username: [${member["username"]}] activated successfully`,
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                  confirmButton: 'mr-1 btn btn-primary'
                },
                buttonsStyling: false
              }).then(() => {
                window.location.reload()
              })

              // Swal.fire('Congratulations!', `Package Rs ${plan_details.price} purchased successfully <br /> Username: [${member["username"]}] activated successfully`, 'success')

            }
            if (response.data.success === false) Swal.fire('Plan purchase failed!', response.data.message, 'error')


            // response.data.data.push({ id: 0, username: "admin", fullname: "Kavyansh Kumar" })
            //  if (response.data.data.length === 0) setLeadList([{ username: "admin", fullname: "Avinash Shete" }])
            // console.log(response.data.data)
            // setLeadList(response.data.data)
          })
      }
      if (result.isDismissed || result.isDenied) {

      }
    })

    // console.log(plan_id)

  }
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
                  {`${plan.validity} days`}
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

                <Button.Ripple className='text-center' onClick={() => handlePlanPurchase(plan.plan_id)} color='primary' block>
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
