import { useContext, useState } from 'react'
import { List, Award, Info } from 'react-feather'
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
import { Row, Col, Button, Card, CardHeader, CardTitle, CardBody, Media, CardText, Alert, Label, Input } from 'reactstrap'
import OrdersReceived from '@src/views/ui-elements/cards/statistics/OrdersReceived'
import CardCongratulations from '@src/views/ui-elements/cards/advance/CardCongratulations'
import StatsWithLineChart from '@components/widgets/stats/StatsWithLineChart'

import SubscribersGained from '@src/views/ui-elements/cards/statistics/SubscribersGained'
import MembersJoined from '@src/views/ui-elements/cards/analytics/MembersJoined'

import '@styles/react/libs/charts/apex-charts.scss'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const AnalyticsDashboard = () => {
  const { colors } = useContext(ThemeColors)

  const avatarGroupArr = [
    {
      title: 'Billy Hopkins',
      img: require('@src/assets/images/portrait/small/avatar-s-9.jpg').default,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33
    },
    {
      title: 'Amy Carson',
      img: require('@src/assets/images/portrait/small/avatar-s-6.jpg').default,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33
    },
    {
      title: 'Brandon Miles',
      img: require('@src/assets/images/portrait/small/avatar-s-8.jpg').default,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33
    },
    {
      title: 'Daisy Weber',
      img: require('@src/assets/images/portrait/small/avatar-s-7.jpg').default,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33
    },
    {
      title: 'Jenny Looper',
      img: require('@src/assets/images/portrait/small/avatar-s-20.jpg').default,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33
    }
  ],
    data = [
      {
        title: '12 Invoices have been paid',
        content: 'Invoices have been paid to the company.',
        meta: '',
        metaClassName: 'mr-1',
        customContent: (
          <Media>
            <img className='mr-1' src={jsonImg} alt='data.json' height='23' />
            <Media className='mb-0' body>
              data.json
            </Media>
          </Media>
        )
      },
      {
        title: 'Client Meeting',
        content: 'Project meeting with john @10:15am.',
        meta: '',
        metaClassName: 'mr-1',
        color: 'warning',
        customContent: (
          <Media className='align-items-center'>
            <Avatar img={ceo} />
            <Media className='ml-50' body>
              <h6 className='mb-0'>John Doe (Client)</h6>
              <span>CEO of Infibeam</span>
            </Media>
          </Media>
        )
      },
      {
        title: 'Create a new project for client',
        content: 'Add files to new design folder',
        color: 'info',
        meta: '',
        metaClassName: 'mr-1',
        customContent: <AvatarGroup data={avatarGroupArr} />
      },
      {
        title: 'Create a new project for client',
        content: 'Add files to new design folder',
        color: 'danger',
        meta: '',
        metaClassName: 'mr-1'
      }
    ]

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


  return (
    <div id='dashboard-analytics'>
      <Row className='match-height'>
        <Col lg='12' sm='12'>
          {<Alert color='info'>
            <div className='alert-body'>

              <h4 className='text-secondary'> <Info size={20} />{' '} Important Notice / Announcements</h4> <br />
              { }
              <ul>
                <li className="ml-2 text-info ">We are launching new services by 20 Oct</li>
              </ul>
            </div>
          </Alert>}
        </Col>
        {/* <Alert tag={Col} color="info">HEllo</Alert> */}
      </Row>
      <Row className='match-height'>
        <Col lg='6' sm='12'>
          <CardCongratulations />
          {/* <Row>
            <Col xl='3' md='4' sm='6' className='pr-sm-0 mb-md-0 mb-1'>
              <Input value={value} onChange={handleCopy} />
            </Col>
            <Col md='2' sm='12'>
              <CopyToClipboard onCopy={onCopy} text={value} readonly>
                <Button.Ripple color='primary' outline>
                  Copy!
                </Button.Ripple>
              </CopyToClipboard>
            </Col>
          </Row> */}
        </Col>
        <Col lg='3' sm='6'>
          {/* <MembersJoined  /> */}

          <SubscribersGained tag="a" kFormatter={kFormatter} onClick={() => history.push('/members')} />

        </Col>
        <Col lg='3' sm='6'>
          <OrdersReceived kFormatter={kFormatter} warning={colors.warning.main} />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col lg='6' xs='12'>
          <AvgSessions primary={colors.primary.main} />
        </Col>
        <Col lg='6' xs='12'>
          <SupportTracker primary={colors.primary.main} danger={colors.danger.main} />
        </Col>
      </Row>
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
