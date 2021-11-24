import { Card, CardHeader, CardBody, CardTitle, Spinner } from 'reactstrap'
import DetailsCard from './DetailsCard'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import api, { getUserId } from '@configs/apiConfig'
const Data = [
  [
    {
      id: "1234",
      name: "Harshal Bokade"
    },
    {
      id: "1234",
      name: "Harshal Bokade"
    },
    {
      id: "1234",
      name: "Harshal Bokade"
    }
  ],
  [
    {
      id: "1234",
      name: "Harshal Bokade"
    }
  ]

]

const Details = () => {
  const [Levels, setLevels] = useState([])
  const [Loading, setLoading] = useState(true)
  useEffect(() => {
    axios
      .get(`${api.routes.get.members_in_levels}/${getUserId()}`, api.auth)
      .then(response => {
        // console.log(response.data.tree)
        // response.data.shops.foreach(e => console.log(e))
        setLoading(false)
        setLevels([response.data.levels])
        // console.log(Matrix[0])
      })
  }, [])
  // useEffect(() => { 
  //   console.log(Levels)
  // })
  return (
    <Card className="container">
      <CardHeader>
        <CardTitle>Create Awesome Team 🙌</CardTitle>
      </CardHeader>
      <CardBody className="">
        {Loading && <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <Spinner type='grow' color="primary" size='lg' />
        </div>}
        {Levels && <DetailsCard Levels={Levels} />}
      </CardBody>
    </Card>
  )
}

export default Details
