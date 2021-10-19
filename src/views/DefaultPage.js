import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'

const img =  "@src/assets/images/pages/collaborators.svg"

const DefaultPage = () => {
  const source = require(`@src/assets/images/pages/collaborators.svg`).default
  return (
    <Card className="container">

      {/* <CardHeader>
        <CardTitle>Create Awesome Team 🙌</CardTitle>
      </CardHeader> */}
      <CardBody className="">

        <div className="col-md-12 w-100 h-100 text-center ">

          <h1 className="mb-3 text-primary">We are creating something exciting</h1> <br />
          <h5>Stay tuned we will inform you once we finished.</h5>
          <div className='w-100 d-md-flex  px-3'>
            <img className='img-fluid' src={source} alt='Login V2' />
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default DefaultPage
