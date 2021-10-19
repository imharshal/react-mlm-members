import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
  Spinner
} from "reactstrap"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import api from '@configs/apiConfig'

import genealoogy from "@src/assets/css/genealogy.css"
import { User } from "react-feather"
// import MembersTree from "../ui-elements/MembersTree"
// import TreeNode from "../ui-elements/TreeNode"
const MembersTree = (props) => {
  return (
    <ul>
      {props.data.map((item) => (
        <li >
          <div className={"user-hover"}>
            <div className="container-fluid">
              <span className="user-icon">
                <User />
              </span>
              <div className="bottom-text">{item.username}</div>
            </div>
          </div>
          {(item.children.length) ? <MembersTree data={item.children} /> : ''}
        </li>
      ))}
    </ul>

  )
}

const Matrix = () => {
  const [Matrix, setMatrix] = useState([])
  const [Loading, setLoading] = useState(true)
  useEffect(() => {
    if (!Matrix.length) axios
      .get(api.routes.get.tree)
      .then(response => {
        console.log(response.data.tree)
        // response.data.shops.foreach(e => console.log(e))
        setLoading(false)
        setMatrix([response.data.tree])
        // console.log(Matrix[0])
      }, [])
  })

  return (
    <Card className="container">

      <CardHeader>
        <CardTitle>Create Awesome Team 🙌</CardTitle>
      </CardHeader>
      <CardBody className="">

        <div className="col-md-12 w-100 h-100 d-flex justify-content-center align-items-center">

          {Loading && <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <Spinner type='grow' color="primary" size='lg' />
          </div>}

          <div className="genealogy text-center" style={{ overflow: "auto" }}>

            {Matrix && <MembersTree data={Matrix} />}

          </div>
        </div>
      </CardBody>
    </Card>
    // "hello"
  )
}

export default Matrix
