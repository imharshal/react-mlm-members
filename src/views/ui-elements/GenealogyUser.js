import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardText,
    CardLink
  } from "reactstrap"
  import React, { useState, useEffect } from 'react'
  import axios from 'axios'
  
  import genealoogy from "@src/assets/css/genealogy.css"
  import { User } from "react-feather"
  
  const Matrix = () => {
    const [Matrix, setMatrix] = useState()
    useEffect(() => {
      axios
        .get('http://nested-set.test/api/trees')
        .then(response => {
          console.log(response.data.shops)
          console.log(response.data.shops.flat())
  
          setMatrix(response.data.shops)
        })
    }, [])
    const makeTree = (root) => {
      root.foreach(child => {
  
      })
    }
  
    // Matrix.forEach(element => {
    //   element.foreach(e)
    // });
  
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Create Awesome 🙌</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="col-md-12">
            <div className="genealogy text-center" style={{ overflow: "auto" }}>
              {/* { for(i = 0; i<1; i++){
  
            }} */}
              <ul>
                {/* root */}
                <li>
                  <div className={"user-hover"}>
                    <div className="container-fluid">
                      <span className="user-icon">
                        <User />
                      </span>
                      <div className="bottom-text">Harshal</div>
                    </div>
                  </div>
                  {/* Child level */}
                  <ul>
                    {/* left branch root */}
                    <li>
                      <div className={"user-hover"}>
                        <div className="container-fluid">
                          <span className="user-icon">
                            <User />
                          </span>
                          <div className="bottom-text">Left Branch</div>
                        </div>
                      </div>
                      <ul>
                        {/* left branch child 1  */}
                        <li>
                          <div className={"user-hover"}>
                            <div className="container-fluid">
                              <span className="user-icon">
                                <User />
                              </span>
                              <div className="bottom-text">L1</div>
                            </div>
                          </div>
                        </li>
                        {/* left branch child 2  */}
                        <li>
                          <div className={"user-hover"}>
                            <div className="container-fluid">
                              <span className="user-icon">
                                <User />
                              </span>
                              <div className="bottom-text">L2</div>
                            </div>
                          </div>
                        </li>
                        {/* left branch child 2  */}
                        <li>
                          <div className={"user-hover"}>
                            <div className="container-fluid">
                              <span className="user-icon">
                                <User />
                              </span>
                              <div className="bottom-text">L3</div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>
                    {/* Right branch root */}
                    <li>
                      <div className={"user-hover"}>
                        <div className="container-fluid">
                          <span className="user-icon">
                            <User />
                          </span>
                          <div className="bottom-text">Right Branch</div>
                        </div>
                      </div>
                      <ul>
                        {/* Right branch child 1  */}
                        <li>
                          <div className={"user-hover"}>
                            <div className="container-fluid">
                              <span className="user-icon">
                                <User />
                              </span>
                              <div className="bottom-text">R1</div>
                            </div>
                          </div>
                        </li>
                        {/* Right branch child 2  */}
                        <li>
                          <div className={"user-hover"}>
                            <div className="container-fluid">
                              <span className="user-icon">
                                <User />
                              </span>
                              <div className="bottom-text">R2</div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>
                    {/* Extra branch root */}
                    <li>
                      <div className={"user-hover"}>
                        <div className="container-fluid">
                          <div className="text-center">
                            {/* <i className="fa fa-user fa-2x user-icon" /> */}
                            <span className="user-icon">
                              <User />
                            </span>
                          </div>
                          <div className="bottom-text">Extra Branch</div>
                        </div>
                      </div>
                      <ul>
                        {/* Extra branch child 1  */}
                        <li>
                          <div className={"user-hover"}>
                            <div className="container-fluid">
                              <span className="user-icon">
                                <User />
                              </span>
                              <div className="text-center bottom-text">E1</div>
                            </div>
                          </div>
                        </li>
                        {/* Extra branch child 2  */}
                        <li>
                          <div className={"user-hover"}>
                            <div className="container-fluid">
                              <span className="user-icon">
                                <User />
                              </span>
                              <div className="bottom-text">E2</div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>
      // "hello"
    )
  }
  
  export default Matrix
  