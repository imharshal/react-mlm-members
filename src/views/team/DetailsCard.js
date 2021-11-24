import React from 'react'
import { UncontrolledCollapse, Button, CardBody, Card, Row, Col } from 'reactstrap'
import classnames from 'classnames'

const MemberDetails = (props) => {
    return (
        <>
            <UncontrolledCollapse toggler={`#toggler${props.parentKey}`} className="accordion-inner col-md-6" >
                <Row className="mt-0 text-left d-none d-md-flex">

                    <Col md={3} className="mt-0 text-center">
                        <span className=" text-Secondary  font-weight-bolder">Username</span>
                        {/* <span className={classnames('badge', { 'badge-success': member.payment_flag, 'badge-danger': !member.payment_flag })}>{`@ ${member.username}`}</span> */}
                    </Col>
                    <Col md={3} className="mt-md-0 mt-1" >
                    <span className=" ml-2 text-Secondary font-weight-bolder">Name</span>

                        {/* <span className=" text-primary font-weight-bolder">{member.fullname}</span> */}
                    </Col>
                    <Col md={3} className="mt-md-0 mt-1" >
                    <span className=" text-Secondary font-weight-bolder">Mobile</span>

                        {/* <span className=" text-primary font-weight-bolder">{member.mobile}</span> */}
                    </Col>
                    <Col md={3} className="mt-md-0 mt-1" >
                    <span className=" text-Secondary font-weight-bolder">Joining</span>

                        {/* <span className=" text-primary font-weight-bolder">{new Date(member.created_at).toLocaleDateString('en-UK')}</span> */}
                    </Col>
                </Row>
                {props.Data.map((member, memberKey) => (
                    <Card key={memberKey} className="mb-0">
                        <CardBody className="mt-0">
                            <Row className="mt-0">

                                <Col md={3} className="mt-0">
                                    <span className={classnames('badge', { 'badge-success': member.payment_flag, 'badge-danger': !member.payment_flag })}>{`@ ${member.username}`}</span>
                                </Col>
                                <Col md={3} className="mt-md-0 mt-1" >
                                    <span className=" text-primary font-weight-bolder">{member.fullname}</span>
                                </Col>
                                <Col md={3} className="mt-md-0 mt-1" >
                                    <span className=" text-primary font-weight-bolder">{member.mobile}</span>
                                </Col>
                                <Col md={3} className="mt-md-0 mt-1" >
                                    <span className=" text-primary font-weight-bolder">{new Date(member.created_at).toLocaleDateString('en-UK')}</span>
                                </Col>
                            </Row>
                        </CardBody>
                        <hr className="m-0 p-0" />
                    </Card>
                ))
                }
            </UncontrolledCollapse>
        </>
    )
}


const DetailsCard = (props) => {
    return (
        <div>
            {/* {console.log(props.Levels)} */}

            {props.Levels.map((Level, LevelKey) => (

                <div key={`level${LevelKey}`}>

                    <Button className="text-left col-md-6" block color="primary" id={`toggler${1}`} style={{ marginBottom: '1rem' }}>
                        Level 1
                    </Button>
                    <MemberDetails Data={Level[1]} parentKey={1} />
                    <Button className="text-left col-md-6" block disabled={(Level[1].length === 0)} color="primary" id={`toggler${2}`} style={{ marginBottom: '1rem' }}>
                        Level 2
                    </Button>
                    <MemberDetails Data={Level[2]} parentKey={2} />
                    <Button className="text-left col-md-6" block disabled={(Level[3].length === 0)} color="primary" id={`toggler${3}`} style={{ marginBottom: '1rem' }}>
                        Level 3
                    </Button>
                    <MemberDetails Data={Level[3]} parentKey={3} />
                    <Button className="text-left col-md-6" block disabled={(Level[4].length === 0)} color="primary" id={`toggler${4}`} style={{ marginBottom: '1rem' }}>
                        Level 4
                    </Button>
                    <MemberDetails Data={Level[4]} parentKey={4} />
                    <Button className="text-left col-md-6" block disabled={(Level[5].length === 0)} color="primary" id={`toggler${5}`} style={{ marginBottom: '1rem' }}>
                        Level 5
                    </Button>
                    <MemberDetails Data={Level[5]} parentKey={5} />
                    <Button className="text-left col-md-6" block disabled={(Level[6].length === 0)} color="primary" id={`toggler${6}`} style={{ marginBottom: '1rem' }}>
                        Level 6
                    </Button>
                    <MemberDetails Data={Level[6]} parentKey={6} />
                    <Button className="text-left col-md-6" block disabled={(Level[7].length === 0)} color="primary" id={`toggler${7}`} style={{ marginBottom: '1rem' }}>
                        Level 7
                    </Button>
                    <MemberDetails Data={Level[7]} parentKey={7} />
                    <Button className="text-left col-md-6" block disabled={(Level[8].length === 0)} color="primary" id={`toggler${8}`} style={{ marginBottom: '1rem' }}>
                        Level 8
                    </Button>
                    <MemberDetails Data={Level[8]} parentKey={8} />
                    <Button className="text-left col-md-6" block disabled={(Level[9].length === 0)} color="primary" id={`toggler${9}`} style={{ marginBottom: '1rem' }}>
                        Level 9
                    </Button>
                    <MemberDetails Data={Level[9]} parentKey={9} />
                    <Button className="text-left col-md-6" block disabled={(Level[10].length === 0)} color="primary" id={`toggler${10}`} style={{ marginBottom: '1rem' }}>
                        Level 10
                    </Button>
                    <MemberDetails Data={Level[10]} parentKey={10} />

                </div>
            ))
            }

        </div>
    )
}

export default DetailsCard