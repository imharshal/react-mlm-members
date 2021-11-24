import { Row, Col, Card, CardBody, CardHeader, CardTitle } from 'reactstrap'
import AllPlansCard from './AllPlansCard'
import ActivePlanCard from './ActivePlanCard'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import api, { getUserId } from '@configs/apiConfig'
import { updateProfile } from '../../configs/apiConfig'
import { memberExpression } from '@babel/types'

const MyAlert = withReactContent(Swal)

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


const Plans = () => {

  const [Packages, setPackages] = useState([])
  const [ActivePackage, setActivePackages] = useState([])
  useEffect(() => {
    updateProfile()
    try {
      axios
        .get(api.routes.get.plans, api.auth)
        .then(response => {
          setPackages(response.data.data)
        })
        .catch(error => {
          // console.log(error.response)
          MyAlert.fire('Network Error', 'Kindly check your internet connection', 'error')
        })

      axios
        .get(`${api.routes.get.active_plan}/${getUserId()}`, api.auth)
        .then(response => {
          if (response.data.success) {
            setActivePackages(response.data.data)

          }
          // console.log(response)
        })
        .catch(error => {
          Swal.fire('No plan active!', 'Kindly purchase any plan to get more services', 'info')

        })

    } catch (e) {
      MyAlert.fire('Invalid Request', 'Kindly relogin to fix this issue', 'error')
    }

  }, [])


  return (
    <Card className="container">

      <CardHeader>
        {ActivePackage && ActivePackage.validity && <CardTitle>Active</CardTitle>}
      </CardHeader>
      <CardBody className="">
        <Row>
          {ActivePackage && ActivePackage.validity && <ActivePlanCard plan={ActivePackage} />}
        </Row>

        {<CardHeader >
          <CardTitle>All Plan</CardTitle>
        </CardHeader>
        }
        <Row>
          {<AllPlansCard plans={Packages} />}
        </Row>
      </CardBody>
    </Card>
    // "hello"
  )
}

export default Plans
