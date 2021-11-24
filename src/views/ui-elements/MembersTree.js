import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import genealogy from "@src/assets/css/genealogy.css"
import { User } from "react-feather"


function MembersTree(props) {
    const [Matrix, setMatrix] = useState()
    useEffect(() => {
        axios
            .get('http://nested-set.test/api/trees')
            .then(response => {
                // console.log(response.data.shops[0])
                // response.data.shops.foreach(e => console.log(e))

                setMatrix(response.data[0])
            })
    }, [])

    return (
        <>
            {Matrix && Matrix.map((item) => (
                <>
                    <li className="card">
                        {item.username}
                        {item.children?.length && <MembersTree data={item.children} />}
                    </li>
                </>
            ))}
        </>
    )
}

export default MembersTree