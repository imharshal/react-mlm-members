import { Row, Col, Card, CardBody, CardHeader, CardTitle } from 'reactstrap'
import AllPlansCard from './AllPlansCard'
import ActivePlanCard from './ActivePlanCard'
const data = [

  {
    price: "999",
    expiry: 100,
    daily_income: 25
  },
  {
    price: "1999",
    expiry: 100,
    daily_income: 50
  },
  {
    price: "2999",
    expiry: 100,
    daily_income: 75
  },
  {
    price: "3999",
    expiry: 100,
    daily_income: 100
  },
  {
    price: "4999",
    expiry: 100,
    daily_income: 125
  },
  {
    price: "5999",
    expiry: 100,
    daily_income: 150
  },
  {
    price: "6999",
    expiry: 100,
    daily_income: 175
  },
  {
    price: "7999",
    expiry: 100,
    daily_income: 200
  }
]

const activePlan =
{
  price: "7999",
  expiry: 100,
  daily_income: 200
}

const Plans = () => {
  return (
    <Card className="container">

      <CardHeader>
        <CardTitle>Active Plan</CardTitle>
      </CardHeader>
      <CardBody className="">
        <Row>
          {activePlan && <ActivePlanCard plan={activePlan} />}
        </Row>

        <CardHeader>
          <CardTitle>All Plan</CardTitle>
        </CardHeader>
        <Row>
          {<AllPlansCard plans={data} />}
        </Row>
      </CardBody>
    </Card>
    // "hello"
  )
}

export default Plans
