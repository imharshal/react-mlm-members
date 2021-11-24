// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { Card, CardBody, CardText, Button, Row, Col } from 'reactstrap'
import { DollarSign, TrendingUp, User, Check, Star, Flag, Phone, AtSign, Calendar, Mail, PhoneCall, PhoneIncoming, Info, Share, Share2 } from 'react-feather'

const UserInfoCard = ({ selectedUser }) => {
  // ** render user img
  const renderUserImg = () => {
    if (selectedUser !== null && selectedUser.avatar && selectedUser.avatar.length > 10) {
      return <img src={selectedUser.avatar} alt='user-avatar' className='img-fluid rounded' height='104' width='104' />
    } else {
      const stateNum = (selectedUser && selectedUser.avatar), //Math.floor(Math.random() * 6),
        states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
        color = states[stateNum]
      return (
        <Avatar
          initials
          color={color}
          className='rounded'
          content={selectedUser.fullname}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(36px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '90px',
            width: '90px'
          }}
        />
      )
    }
  }

  return (
    <Card>
      <CardBody>
        <Row>
          <Col xl='7' lg='12' className='d-flex flex-column justify-content-between border-container-lg'>
            <div className='user-avatar-section'>
              <div className='d-flex justify-content-start'>
                {renderUserImg()}
                <div className='d-flex flex-column ml-1'>
                  <div className='user-info mb-1'>
                    <h4 className='mb-0'>{selectedUser !== null ? selectedUser.fullname : 'Eleanor Aguilar'}</h4>
                    <CardText tag='span'>
                      <AtSign className='mr-1' size={14} />
                      {selectedUser !== null && selectedUser.username}
                    </CardText> <br />
                    <CardText tag='span' className='user-info mb-0'>
                      <PhoneCall className='mr-1' size={14} />
                      {selectedUser !== null && selectedUser.mobile}
                    </CardText><br />
                    <CardText tag='span' className='user-info mb-0 overflow-auto'>
                      <Mail className='mr-1' size={14} />
                      {selectedUser !== null && selectedUser.email}
                    </CardText>
                  </div>
                </div>
              </div>
            </div>
          </Col>

        </Row>
        <Row>
          <Col xl='8' lg='12'>
            <div className=' ml-md-3 user-info-wrapper user-total-numbers'>
              <h4 className="text-primary">Personal Details</h4><br />
              <div className='pt-0 d-flex flex-wrap align-items-center'>
                <div className='user-info-title'>
                  <AtSign className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Username
                  </CardText>
                </div>
                <CardText className='mb-0'>
                  {selectedUser !== null && selectedUser.username}
                </CardText>
              </div>

              <div className='d-flex flex-wrap align-items-center my-50'>
                <div className='user-info-title'>
                  <User className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Full name
                  </CardText>
                </div>
                <CardText className='mb-0'>{selectedUser !== null && selectedUser.fullname}</CardText>
              </div>

              <div className='d-flex flex-wrap align-items-center my-50'>
                <div className='user-info-title'>
                  <Calendar className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Date of Birth
                  </CardText>
                </div>
                <CardText className='mb-0'>{selectedUser !== null && selectedUser.dob}</CardText>
              </div>
              <div className='d-flex flex-wrap align-items-center'>
                <div className='user-info-title'>
                  <Phone className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Contact
                  </CardText>
                </div>
                <CardText className='mb-0'>{selectedUser !== null && selectedUser.mobile}</CardText>
              </div>
              <div className='d-flex flex-wrap align-items-center my-50'>
                <div className='user-info-title'>
                  <Mail className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Email
                  </CardText>
                </div>
                <CardText className='mb-0'>{selectedUser !== null && selectedUser.email}</CardText>
              </div>
            </div>
          </Col>
          {/* <Col xl='6' lg='12'>
            <div className=' ml-md-3 user-info-wrapper user-total-numbers'>
              <h4 className="text-primary">Address Details</h4><br />
              <div className='pt-0 d-flex flex-wrap align-items-center'>
                <div className='user-info-title'>
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Address
                  </CardText>
                </div>
                <CardText className='mb-0'>
                  {selectedUser !== null && selectedUser.address}
                </CardText>
              </div>

              {(selectedUser !== null && selectedUser.town) &&
                <div className='d-flex flex-wrap align-items-center my-50'>
                  <div className='user-info-title'>
                    <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                      Town
                    </CardText>
                  </div>
                  <CardText className='mb-0'>{selectedUser !== null && selectedUser.town}</CardText>
                </div>}

              <div className='d-flex flex-wrap align-items-center my-50'>
                <div className='user-info-title'>
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    City
                  </CardText>
                </div>
                <CardText className='mb-0'>{selectedUser !== null && selectedUser.city}</CardText>
              </div>

              <div className='d-flex flex-wrap align-items-center my-50'>
                <div className='user-info-title'>
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    District
                  </CardText>
                </div>
                <CardText className='mb-0'>{selectedUser !== null && selectedUser.district}</CardText>
              </div>

              <div className='d-flex flex-wrap align-items-center my-50'>
                <div className='user-info-title'>
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    State
                  </CardText>
                </div>
                <CardText className='mb-0'>{selectedUser !== null && selectedUser.state}</CardText>
              </div>
 */}
          {/* <div className='d-flex flex-wrap align-items-center my-50'>
                <div className='user-info-title'>
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Country
                  </CardText>
                </div>
                <CardText className='mb-0'>{selectedUser !== null && selectedUser.country}</CardText>
              </div>
              <div className='d-flex flex-wrap align-items-center my-50'>
                <div className='user-info-title'>
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Pincode
                  </CardText>
                </div>
                <CardText className='mb-0'>{selectedUser !== null && selectedUser.pincode}</CardText>
              </div>

            </div>
          </Col>
          <Col xl='6' lg='12'>
            <div className=' ml-md-3 user-info-wrapper user-total-numbers'>
              <h4 className="text-primary">Nominee Details</h4><br />
              <div className='pt-0 d-flex flex-wrap align-items-center'>
                <div className='user-info-title'>
                  <User className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Name
                  </CardText>
                </div>
                <CardText className='mb-0'>
                  {selectedUser !== null && selectedUser.nominee_name}
                </CardText>
              </div>

              <div className='d-flex flex-wrap align-items-center my-50'>
                <div className='user-info-title'>
                  <Share2 className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Relation
                  </CardText>
                </div>
                <CardText className='mb-0'>{selectedUser !== null && selectedUser.nominee_relation}</CardText>
              </div>

              <div className='d-flex flex-wrap align-items-center my-50'>
                <div className='user-info-title'>
                  <Info className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Aadhar
                  </CardText>
                </div>
                <CardText className='mb-0'>{selectedUser !== null && selectedUser.nominee_aadhar}</CardText>
              </div>

              <div className='d-flex flex-wrap align-items-center my-50'>
                <div className='user-info-title'>
                  <PhoneIncoming className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Contact
                  </CardText>
                </div>
                <CardText className='mb-0'>{selectedUser !== null && selectedUser.nominee_mobile}</CardText>
              </div>

            </div>
          </Col> */}

        </Row>
      </CardBody>
    </Card>
  )
}

export default UserInfoCard
