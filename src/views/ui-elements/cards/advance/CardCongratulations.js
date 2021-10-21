import { useState, useEffect, Fragment } from 'react'
import { Award, Check } from 'react-feather'
import Avatar from '@components/avatar'
import { Card, Row, Col, Input, Button, CardBody, CardText } from 'reactstrap'
import decorationLeft from '@src/assets/images/elements/decore-left.png'
import decorationRight from '@src/assets/images/elements/decore-right.png'
import { isUserLoggedIn } from '@utils'
import { toast } from 'react-toastify'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const CardCongratulations = (props) => {
  // ** State
  const [userData, setUserData] = useState(null)

  const ToastSuccess = () => (
    <Fragment>
      <div className='toastify-header pb-0'>
        <div className='title-wrapper'>
          <Avatar size='sm' color='success' icon={<Check />} />
          <h6 className='toast-title'>Refer link copied successfully!</h6>
        </div>
      </div>
    </Fragment>
  )

  const [Refer, setRefer] = useState('')
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

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      const username = JSON.parse(localStorage.getItem('userData'))
      setUserData(JSON.parse(localStorage.getItem('userData')))
      setRefer(`https://dashboard.cashmind.in/ref/${username['username']}`)
    }
  }, [])
  return (
    <Card className='card-congratulations'>
      <CardBody className='text-center'>
        <img className='congratulations-img-left' src={decorationLeft} alt='decor-left' />
        <img className='congratulations-img-right' src={decorationRight} alt='decor-right' />
        <Avatar icon={<Award size={28} />} className='shadow' color='primary' size='xl' />
        <div className='text-center'>
          <h1 className='mb-1 text-white'>{`Welcome ${(userData && userData['fullname'].split(' ')[0])},`}</h1>
          <CardText className='m-auto w-75'>
            All the best for your career journey. We are glad that you are part of our success.
          </CardText>
        </div>
        <Row className="mt-2">
          <Col md="8" className='pr-sm-0 mb-md-0 mb-1'>
            <Input className="bg-primary text-white" value={Refer} onChange={handleCopy} readOnly />
          </Col>
          <Col md="4" sm='12'>
            <CopyToClipboard onCopy={onCopy} text={Refer} className=" bg-light">
              <Button.Ripple color='primary' outline>
                Copy refer link!
              </Button.Ripple>
            </CopyToClipboard>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default CardCongratulations
