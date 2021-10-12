// ** React Imports
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions

// ** Reactstrap
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
import PlanCard from './PlanCard'
import UserInfoCard from './UserInfoCard'
import UserTimeline from './UserTimeline'
// import InvoiceList from '../../invoice/list'
import PermissionsTable from './PermissionsTable'

// ** Styles
import '@styles/react/apps/app-users.scss'
import axios from 'axios'
// const selectedUser =
// {
//   id: 1,
//   fullName: 'Harshal Bokade',
//   company: 'Harshal PVT LTD',
//   role: 'editor',
//   username: 'harshal984',
//   country: 'India',
//   contact: '(479) 232-9151',
//   email: 'harshal@gmail.com',
//   currentPlan: 'enterprise',
//   status: 'inactive',
//   avatar: ''
// }


const UserView = props => {
  // ** Vars
  // const store = useSelector(state => state.users),
  //   dispatch = useDispatch(),
  //   { id } = useParams()

  // ** Get suer on mount
  const [user, setUser] = useState([])
  useEffect(() => {
    axios
      .get('http://cashmind-api.test/api/v1/members')
      .then(response => console.log(JSON.stringify(response.data.data)))
    // setUser(response.data.user)
    // setUser(selectedUser)
    console.log()
  }, [])

  return (
    <div className='app-user-view'>
      <Row>
        <Col xl='9' lg='8' md='7'>
          {/* <UserInfoCard selectedUser={user} /> */}
        </Col>
        <Col xl='3' lg='4' md='5'>
          <PlanCard selectedUser={user} />
        </Col>
      </Row>
      <Row>
        <Col md='6'>
          {/* <UserTimeline /> */}
        </Col>
        <Col md='6'>
          {/* <PermissionsTable /> */}
        </Col>
      </Row>
      <Row>
        <Col sm='12'>
          {/* <InvoiceList /> */}
        </Col>
      </Row>
    </div>
  )
}
export default UserView
