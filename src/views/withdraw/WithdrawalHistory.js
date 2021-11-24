import React, { forwardRef, useState, useEffect } from "react"
import ReactDOM from "react-dom"
import DataTable from "react-data-table-component"
import Card from "@material-ui/core/Card"
import { Spinner } from "reactstrap"
import axios from "axios"
import api, { getUserId } from "../../configs/apiConfig"
// import SortIcon from "@material-ui/icons/ArrowDownward"
import CardBody from "reactstrap/lib/CardBody"
import MaterialTable from 'material-table'

import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
}


const columns = [
    {
        name: "Title",
        selector: (row) => row.title
    },
    {
        name: "Year",
        selector: (row) => row.year
    }
]

const data = [
    {
        id: 1,
        title: "Beetlejuice",
        year: "1988"
    },
    {
        id: 2,
        title: "Ghostbusters",
        year: "1984"
    }
]

const FundHistory = () => {
    const [Transactions, setTransactions] = useState([])
    const [Loading, setLoading] = useState(true)

    useEffect(() => {
        try {
            axios
                .get(`${api.routes.get.withdrawal_history}/${getUserId()}`, api.auth)
                //     // .then(response => console.log([response.data]))
                .then(response => {
                    setLoading(false)
                    // console.log(response.data.data)
                    setTransactions(response.data.data)
                })

        } catch (e) {
            console.log(e)
            setLoading(false)
            // MyAlert.fire('Invalid Request', 'Kindly relogin to fix this issue', 'error')
        }
    }, [])


    return (
        <>
            <div className="col-md-12 w-100 h-100 d-flex justify-content-center align-items-center">
                {Loading && <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                    <Spinner type='grow' color="primary" size='lg' />
                </div>}
            </div>
            {!Loading
                && <MaterialTable
                    title="Withdrawal History"
                    columns={[
                        { title: 'Date', field: 'created_at', type: 'datetime', defaultSort: 'desc' },
                        { title: 'Transaction ID', field: 'txn_id' },
                        { title: 'Operator Ref', field: 'operator_ref' },
                        { title: 'Type', field: 'type' },
                        { title: 'Status', field: 'status' },
                        { title: 'Debit Amount', field: 'amount' },
                        { title: 'Balance', field: 'balance' }
                    ]}
                    data={Transactions}
                    icons={tableIcons}

                />
            }
        </>
    )
}

export default FundHistory
