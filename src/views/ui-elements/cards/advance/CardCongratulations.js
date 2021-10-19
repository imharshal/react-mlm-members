import { useState, useEffect } from 'react'
import { Award } from 'react-feather'
import Avatar from '@components/avatar'
import { Card, CardBody, CardText } from 'reactstrap'
import decorationLeft from '@src/assets/images/elements/decore-left.png'
import decorationRight from '@src/assets/images/elements/decore-right.png'
import { isUserLoggedIn } from '@utils'

const CardCongratulations = (props) => {
  // ** State
  const [userData, setUserData] = useState(null)

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
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
      </CardBody>
    </Card>
  )
}

export default CardCongratulations
