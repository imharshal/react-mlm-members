// import { render } from 'node-sass'
import { useContext, useState, useEffect } from 'react'
import { List, Award, Info, Users, Download, Upload, DollarSign } from 'react-feather'
import { kFormatter } from '@utils'
import Avatar from '@components/avatar'
import Timeline from '@components/timeline'
import AvatarGroup from '@components/avatar-group'
import jsonImg from '@src/assets/images/icons/json.png'
// import InvoiceList from '@src/views/apps/invoice/list'
import ceo from '@src/assets/images/portrait/small/avatar-s-9.jpg'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import Sales from '@src/views/ui-elements/cards/analytics/Sales'
import AvgSessions from '@src/views/ui-elements/cards/analytics/AvgSessions'
import CardAppDesign from '@src/views/ui-elements/cards/advance/CardAppDesign'
import SupportTracker from '@src/views/ui-elements/cards/analytics/SupportTracker'
import { Row, Col, Button, Card, CardHeader, CardTitle, CardBody, Media, CardText, Alert, Label, Input, Table } from 'reactstrap'
import OrdersReceived from '@src/views/ui-elements/cards/statistics/OrdersReceived'
import CardCongratulations from '@src/views/ui-elements/cards/advance/CardCongratulations'
import StatsWithLineChart from '@components/widgets/stats/StatsWithLineChart'
import SubscribersGained from '@src/views/ui-elements/cards/statistics/SubscribersGained'
import MembersJoined from '@src/views/ui-elements/cards/analytics/MembersJoined'
import FundWallet from './FundWallet'
import MainWallet from './MainWallet'
import '@styles/react/libs/charts/apex-charts.scss'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import StatsWithAreaChart from '@components/widgets/stats/StatsWithAreaChart'

import axios from 'axios'
import api, { updateProfile, getUserId } from '../../configs/apiConfig'
import StatsCard from './StatsCard'

const IncomeTable = (props) => {
  return (
    <tr>{
      props.Levels.map((level, key) => {
        <>
          {/* {console.log(props.Levels)} */}
          {console.log(key, props.Levels[level].active)}
          <td className="font-weight-bold">{key}</td>
          <td className="font-weight-bold text-success">{level.active}</td>
          <td className="font-weight-bold text-danger">{level.inactive}</td>
          <td className="font-weight-bold text-success">{level.income}</td>
          <td className="font-weight-bold text-success">{level.daily_income}</td>
        </>
      })}
    </tr>
  )
}

const AnalyticsDashboard = () => {
  const { colors } = useContext(ThemeColors)
  const ToastSuccess = () => (
    <Fragment>
      <div className='toastify-header pb-0'>
        <div className='title-wrapper'>
          <Avatar size='sm' color='success' icon={<Check />} />
          <h6 className='toast-title'>Copied To Clipboard !</h6>
        </div>
      </div>
    </Fragment>
  )

  const [value, setValue] = useState('')
  const [copied, setCopied] = useState(false)

  const [UserData, setUserData] = useState([])
  const [StatsData, setStatsData] = useState([])
  const [Notifications, setNotifications] = useState([])
  /*eslint-enable */

  const handleCopy = ({ target: { value } }) => {
    setValue(value)
    setCopied(false)
  }

  const onCopy = () => {
    setCopied(true)
    toast.success(<ToastSuccess />, {
      autoClose: 3000,
      hideProgressBar: true,
      closeButton: false
    })
  }

  useEffect(() => {
    axios.get(api.routes.get.notifications)
      .then(response => setNotifications(response.data.data))
    setUserData(JSON.parse(localStorage.getItem('userData')))
  }, [])

  useEffect(() => {
    axios.get(`${api.routes.get.statistics}/${getUserId()}`, api.auth)
      .then(response => {
        setStatsData(response.data)
      })
  }, [UserData])

  const [Levels, setLevels] = useState([])
  const [Total, setTotal] = useState([])
  // const [Loading, setLoading] = useState(true)
  useEffect(() => {
    axios
      .get(`${api.routes.get.members_in_levels_count}/${getUserId()}`, api.auth)
      .then(response => {
        // console.log(response.data.tree)
        // response.data.shops.foreach(e => console.log(e))
        // setLoading(false)
        setLevels([response.data.levels])
        setTotal(response.data.total)
        // console.log(response.data.levels)
      })
  }, [])

  useEffect(() => {
    // console.log(Levels)
  }, [])

  return (
    <div id='dashboard-analytics' >
      <Row className='match-height'>
        <Col lg='12' sm='12'>
          {Notifications[0] && <Alert color='info'>
            <div className='alert-body'>

              <h4 className='text-secondary'> <Info size={20} />{' '} Important Notice / Announcements</h4> <br />
              <ul>
                {Notifications.map((notice, index) => {
                  return (
                    <li className="ml-2 text-info " key={index}>{notice.notice}</li>
                  )
                })}
              </ul>
            </div>
          </Alert>}
        </Col>
        {/* <Alert tag={Col} color="info">HEllo</Alert> */}
      </Row>
      <Row className='match-height'>
        <Col lg='6' sm='12'>
          <CardCongratulations />
        </Col>
        <Col lg='3' sm='6'>
          <FundWallet />
        </Col>
        <Col lg='3' sm='6'>
          <MainWallet />
          {/* <OrdersReceived kFormatter={kFormatter} warning={colors.warning.main} /> */}
        </Col>
      </Row>
      <Row >
        <Col lg="6" sm="12" className="mr-0 pr-0">
          <Card>
            <CardBody>
              <Table bordered={true} className="table-responsive text-center">
                <thead>
                  <tr className="text-center">
                    <th rowSpan="2">Levels</th>
                    <th colSpan="2">Members</th>
                    <th colSpan="2">Level Income</th>
                  </tr>
                  <tr>
                    {/* <td></td> */}
                    <td className="font-weight-bold text-success">Active</td>
                    <td className="font-weight-bold text-danger">Inactive</td>
                    <td className="font-weight-bold text-success">Income</td>
                    <td className="font-weight-bold text-success">Daily Income</td>
                  </tr>
                </thead>
                {/* console.log(key, obj[key]) */}
                {Levels.map((Level, LevelKey) => (
                  <tbody key={LevelKey}>
                    <tr>
                      <td className="font-weight-bold">1</td>
                      <td className="font-weight-bold text-success">{Level.l1.active}</td>
                      <td className="font-weight-bold text-danger">{Level.l1.inactive}</td>
                      <td className="font-weight-bold text-success">{Level.l1.income}</td>
                      <td className="font-weight-bold text-success">{Level.l1.daily_income}</td>
                    </tr>
                    <tr>
                      <td className="font-weight-bold">2</td>
                      <td className="font-weight-bold text-success">{Level.l2.active}</td>
                      <td className="font-weight-bold text-danger">{Level.l2.inactive}</td>
                      <td className="font-weight-bold text-success">{Level.l2.income}</td>
                      <td className="font-weight-bold text-success">{Level.l2.daily_income}</td>
                    </tr>
                    <tr>
                      <td className="font-weight-bold">3</td>
                      <td className="font-weight-bold text-success">{Level.l3.active}</td>
                      <td className="font-weight-bold text-danger">{Level.l3.inactive}</td>
                      <td className="font-weight-bold text-success">{Level.l3.income}</td>
                      <td className="font-weight-bold text-success">{Level.l3.daily_income}</td>
                    </tr>
                    <tr>
                      <td className="font-weight-bold">4</td>
                      <td className="font-weight-bold text-success">{Level.l4.active}</td>
                      <td className="font-weight-bold text-danger">{Level.l4.inactive}</td>
                      <td className="font-weight-bold text-success">{Level.l4.income}</td>
                      <td className="font-weight-bold text-success">{Level.l4.daily_income}</td>
                    </tr>
                    <tr>
                      <td className="font-weight-bold">5</td>
                      <td className="font-weight-bold text-success">{Level.l5.active}</td>
                      <td className="font-weight-bold text-danger">{Level.l5.inactive}</td>
                      <td className="font-weight-bold text-success">{Level.l5.income}</td>
                      <td className="font-weight-bold text-success">{Level.l5.daily_income}</td>
                    </tr>
                    <tr>
                      <td className="font-weight-bold">6</td>
                      <td className="font-weight-bold text-success">{Level.l6.active}</td>
                      <td className="font-weight-bold text-danger">{Level.l6.inactive}</td>
                      <td className="font-weight-bold text-success">{Level.l6.income}</td>
                      <td className="font-weight-bold text-success">{Level.l6.daily_income}</td>
                    </tr>
                    <tr>
                      <td className="font-weight-bold">7</td>
                      <td className="font-weight-bold text-success">{Level.l7.active}</td>
                      <td className="font-weight-bold text-danger">{Level.l7.inactive}</td>
                      <td className="font-weight-bold text-success">{Level.l7.income}</td>
                      <td className="font-weight-bold text-success">{Level.l7.daily_income}</td>
                    </tr>
                    <tr>
                      <td className="font-weight-bold">8</td>
                      <td className="font-weight-bold text-success">{Level.l8.active}</td>
                      <td className="font-weight-bold text-danger">{Level.l8.inactive}</td>
                      <td className="font-weight-bold text-success">{Level.l8.income}</td>
                      <td className="font-weight-bold text-success">{Level.l8.daily_income}</td>
                    </tr>
                    <tr>
                      <td className="font-weight-bold">9</td>
                      <td className="font-weight-bold text-success">{Level.l9.active}</td>
                      <td className="font-weight-bold text-danger">{Level.l9.inactive}</td>
                      <td className="font-weight-bold text-success">{Level.l9.income}</td>
                      <td className="font-weight-bold text-success">{Level.l9.daily_income}</td>
                    </tr>
                    <tr>
                      <td className="font-weight-bold">10</td>
                      <td className="font-weight-bold text-success">{Level.l10.active}</td>
                      <td className="font-weight-bold text-danger">{Level.l10.inactive}</td>
                      <td className="font-weight-bold text-success">{Level.l10.income}</td>
                      <td className="font-weight-bold text-success">{Level.l10.daily_income}</td>
                    </tr>

                  </tbody>

                ))}
                <tr>
                  <td className="font-weight-bolder">Total</td>
                  <td className="font-weight-bolder ">{Total.active}</td>
                  <td className="font-weight-bolder ">{Total.inactive}</td>
                  <td className="font-weight-bolder ">{ }</td>
                  <td className="font-weight-bolder ">{Total.daily_income}</td>
                </tr>
              </Table>
            </CardBody>
          </Card>
        </Col>
        <Col md="6" className="">
          <Row> 
            <Col lg='6' sm='12'>
              {StatsData.DirectLevel &&
                <StatsCard icon={<Users size={21} />}
                  kFormatter={kFormatter}
                  color="primary"
                  Data={StatsData.DirectLevel}
                  title="Your Direct Members" />}
            </Col>
            <Col lg='6' sm='12'>
              {StatsData.ActiveLevel &&
                <StatsCard icon={<Users size={21} />}
                  kFormatter={kFormatter}
                  color="primary"
                  Data={StatsData.ActiveLevel}
                  title="Active Members" />}
            </Col>
            <Col lg='6' sm='12'>
              {StatsData.TotalIncome &&
                <StatsCard icon={<DollarSign size={21} />}
                  kFormatter={kFormatter}
                  color="primary"
                  Data={StatsData.TotalIncome}
                  title="Total Income" />}
            </Col>
            <Col lg='6' sm='12'>
              {StatsData.FundWallet &&
                <StatsCard icon={<DollarSign size={21} />}
                  kFormatter={kFormatter}
                  color="primary"
                  Data={StatsData.FundWallet}
                  title="Fund Wallet" />}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col lg='3' sm='6'>
          {StatsData.FundWalletDeduction &&
            <StatsCard icon={<Upload size={21} />}
              kFormatter={kFormatter}
              color="primary"
              Data={StatsData.FundWalletDeduction}
              title="Fund Wallet Deductions" />}
        </Col>
        <Col lg='3' sm='6'>
          {StatsData.Withdrawal &&
            <StatsCard icon={<Upload size={21} />}
              kFormatter={kFormatter}
              color="primary"
              Data={StatsData.Withdrawal}
              title="Fund Withdrawal" />}
        </Col>
        <Col lg='3' sm='6'>
          {StatsData.LevelIncome &&
            <StatsCard icon={<Download size={21} />}
              kFormatter={kFormatter}
              color="primary"
              Data={StatsData.LevelIncome}
              title="Level Income" />}
        </Col>
        <Col lg='3' sm='6'>
          {StatsData.DailyIncome &&
            <StatsCard icon={<Download size={21} />}
              kFormatter={kFormatter}
              color="primary"
              Data={StatsData.DailyIncome}
              title="Daily Income" />}
        </Col>
        <Col lg='3' sm='6'>
          {StatsData.RewardIncome &&
            <StatsCard icon={<Download size={21} />}
              kFormatter={kFormatter}
              color="primary"
              Data={StatsData.RewardIncome}
              title="Reward Income" />}
        </Col>
      </Row>
     
      {/* <Row className='match-height'>
        <Col lg='6' xs='12'>
          <AvgSessions primary={colors.primary.main} />
        </Col>
        <Col lg='6' xs='12'>
          <SupportTracker primary={colors.primary.main} danger={colors.danger.main} />
        </Col>
      </Row> */}
      {/* <Row className='match-height'>
        <Col lg='4' xs='12'>
          <Card className='card-user-timeline'>
            <CardHeader>
              <div className='d-flex align-items-center'>
                <List className='user-timeline-title-icon' />
                <CardTitle tag='h4'>User Timeline</CardTitle>
              </div>
            </CardHeader>
            <CardBody>
              <Timeline className='ml-50 mb-0' data={data} />
            </CardBody>
          </Card>
        </Col>
        <Col lg='4' md='6' xs='12'>
          <Sales primary={colors.primary.main} info={colors.info.main} />
        </Col>
        <Col lg='4' md='6' xs='12'>
          <CardAppDesign />
        </Col>
      </Row> */}
      <Row className='match-height'>
        <Col xs='12'>
          {/* <InvoiceList /> */}
        </Col>
      </Row>
    </div>
  )
}

export default AnalyticsDashboard
