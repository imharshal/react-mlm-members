import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'
import React from 'react'
import axios from 'axios'

const api = axios.create({ baseURL: "https://api.github.com/users/evanphx" })

export default class ActivePlans extends React.Component { 
  async getPostsData() {
    const response = await api.get()
      try {
      this.setState({
      posts: response.data.posts,
      isLoading: false
      })
      
      console.log(response.data.posts)
      } catch (error) {
      this.setState({ error, isLoading: false })
      }
     }
  // componentDidMount() {
  //   axios.get('https://jsonplaceholder.typicode.com/users')
  //     .then(res => {
  //       console.log(res)
  //       const users = res.data
  //       this.setState({users})
  //     })
  // }

  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Create Awesome 🙌</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>This is default page.</CardText>
          <CardText>
            Chocolate sesame snaps pie carrot cake pastry pie lollipop muffin. Carrot cake dragée chupa chups jujubes.
            Macaroon liquorice cookie wafer tart marzipan bonbon. Gingerbread jelly-o dragée chocolate.
            <br />
            {/* {this.state.users} */}
          </CardText>
        </CardBody>
      </Card>
      // "hello"
    )
  }
}