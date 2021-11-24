/* eslint-disable no-tabs */
import { Fragment, useState, useEffect } from "react"
import Select from "react-select"
import "@styles/react/libs/react-select/_react-select.scss"
import classnames from "classnames"
import { ArrowLeft, ArrowRight, Info } from "react-feather"
import { selectThemeColors, isObjEmpty } from "@utils"
import {
    Label,
    FormGroup,
    Row,
    Col,
    Button,
    Form,
    Input,
    FormFeedback,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Spinner,
    Alert
} from "reactstrap"

import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import Cleave from "cleave.js/react"
import "cleave.js/dist/addons/cleave-phone.in"
import InputMask from "react-input-mask"

import axios from "axios"
import api from "../../configs/apiConfig"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"

// import "@src/image/logo/logo."

const MyAlert = withReactContent(Swal)

//Preserve From state

const SignupSchema = yup.object().shape({
    amount: yup
        .number()
        .typeError("Amount must be a number")
        .default(1)
        .required("Amount is requierd") //.min(200, 'Amount should be greater than Rs 200')
    // bankName: yup.string().required("Bank name is required"),
    // acno: yup.string().required("Account no. is required"),
    // ifsc: yup.string().required("IFSC no. is required")
})
// password: yup.string().required("Password is required"),
// confirmPassword: yup
//   .string()
//   .required()
//   .oneOf([yup.ref(password), null], 'Passwords must match')

const bank = {
    acholder: "Harshal Bokade",
    bank_name: "SBI",
    acno: "123456789",
    ifsc: "SBI00420"
}

const AddFunds = ({ type = "bank" }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        trigger
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(SignupSchema)
    })
    const [BankAccount, setBankAccount] = useState([])
    const [userData, setUserData] = useState([])
    const [Loading, setLoading] = useState(false)
    const [IsFailed, setIsFailed] = useState(false)

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script")
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }
    useEffect(() => {
        axios
            .get(api.routes.get.profile, api.auth)
            .then(response => setUserData(response.data.user))
    }, [])

    const handleSuccess = () => {
        MyAlert.fire({
            title: 'Fund Added Successful!',
            text: 'Check fund history for account statement',
            icon: 'success',
            // confirmButtonText: 'OK',
            customClass: {
                confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false
        })
    }

    const handleFailure = (razorpay_order_id) => {
        const Data = {
            razorpay_order_id
        }
        axios.post(api.routes.post.complete_payment, Data)
            .then(response => {
                // console.log(response)
                //handleSuccess()
            })
        MyAlert.fire({
            title: 'Payment Failed!',
            text: 'Please try after some time',
            icon: 'error',
            // confirmButtonText: 'OK',
            customClass: {
                confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false
        })
    }
    const displayRazorpay = async (data) => {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        )

        if (!res) {
            alert("Are you online?")
            return
        }

        axios
            .post(api.routes.post.initiate_payment, data)
            .then(response => {
                setLoading(false)
                const addFund = response.data.data
                // console.log(addFund)
                const options = {
                    key: addFund.razorpayId,
                    amount: addFund.amount,
                    currency: addFund.currency,
                    name: 'Cashmind',
                    description: addFund.description,
                    // image: { logo },
                    order_id: addFund.orderId,
                    allow_rotation: true,
                    modal: {
                        ondismiss: (order_id) => handleFailure(order_id)
                    },
                    handler: async (response) => {
                        // alert(response)
                        // console.log(response)
                        setLoading(false)

                        axios.post(api.routes.post.complete_payment, response)
                            .then(response => {
                                handleSuccess()
                            })
                        // if (!response) alert('No REsponse')
                    },
                    prefill: {
                        name: addFund.name,
                        email: addFund.email,
                        contact: addFund.contactNumber
                    },
                    notes: {
                        address: addFund.address
                    },
                    theme: {
                        color: "#7367f0"
                    }
                }
                // console.log(options)
                // const paymentObject = new window.Razorpay(options)
                // paymentObject.open()

                const rzp1 = new Razorpay(options)
                rzp1.open()

            })


        // if (!addFund) {
        //     alert("Server error. Are you online?")
        // }

        // const { amount, id: order_id } = result.data

    }

    const onSubmit = (data) => {
        trigger()
        setLoading(true)
        const Data = {
            member_id: userData.id,
            amount: data.amount
        }
        displayRazorpay(Data)
        // console.log(userData)
        // console.log(Data)
    }

    return (
        <>
            <Card className="container">
                <CardHeader>
                    <CardTitle>Add Funds</CardTitle>
                </CardHeader>
                <CardBody className="">
                    <Alert color='primary' >
                        <div className='alert-body'>
                            <div className=' ml-2 mt-2 text-sm'>
                                <Label className='h6 text-secondary'>After successful payment your account will be credited with respected amount within 3 minutes</Label> <br />
                            </div>
                            <div className=' ml-2 mt-2 text-sm'>
                                <Label className='h6 text-danger'>Note: Service charge of 2% will be deducted on every payin.</Label> <br />
                            </div>
                        </div>
                    </Alert>
                    <Form onSubmit={handleSubmit(onSubmit)} className="mt-5">
                        <Row>
                            <FormGroup tag={Col} md="3">
                                <Label className="form-label" for={`amount-${type}`}>
                                    Enter amount to add
                                </Label>
                                <Input
                                    type="number"
                                    name="amount"
                                    id={`amount-${type}`}
                                    placeholder="Amount"
                                    {...register("amount")}
                                    className={classnames({ "is-invalid": errors["amount"] })}
                                />
                                {errors.amount && (
                                    <FormFeedback>{errors.amount.message}</FormFeedback>
                                )}
                            </FormGroup>
                        </Row>

                        <Button.Ripple type='submit' color='primary' disabled={Loading}>
                            {Loading ? <>
                                <Spinner color='white' size='sm' type='grow' />
                                <span className='ml-50'>Processing...</span>
                            </> : 'Add Fund'}
                            <ArrowRight
                                size={14}
                                className="align-middle ml-sm-25 ml-0"
                            ></ArrowRight>
                        </Button.Ripple>
                        {/* <Button.Ripple type="submit" color="primary" disabled={Loading}>
                            Add Fund
                            <ArrowRight
                                size={14}
                                className="align-middle ml-sm-25 ml-0"
                            ></ArrowRight>
                        </Button.Ripple> */}
                    </Form>

                </CardBody>
            </Card>
        </>
    )
}

export default AddFunds
