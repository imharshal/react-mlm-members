import useJwt from '@src/auth/jwt/useJwt'
import axios from 'axios'
import { useState, useEffect } from 'react'
//also change url for JWT auth
const baseUrl = "http://cashmind-api.test/api/v1"
// const baseUrl = "https://api.cashmind.in/api/v1"
const apiToken = useJwt.getToken()
const userData = () => JSON.parse(localStorage.getItem('userData'))

const auth = {
    header: { Authorization: `Bearer ${apiToken}` },
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"

}
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
}
// const [ProfileData, setProfileData] = useState(null)
const updateProfile = () => {
    try {
        axios
            .get(`${baseUrl}/profile`, auth)
            .then(response => {
                // setProfileData(response.data.user)
                localStorage.setItem('userData', JSON.stringify(response.data.user))
                return true
            })

    } catch (e) {
        console.log(e)
        // MyAlert.fire('Invalid Request', 'Kindly relogin to fix this issue', 'error')
    }
}

const getUserId = () => {
    try {
        return JSON.parse(localStorage.getItem('userData')).id
    } catch (e) {
        return ""
    }

}
const api = {

    baseUrl,
    auth,
    headers,
    auth_token: `${apiToken}`,
    routes: {
        post: {
            signup: `${baseUrl}/signup`,
            change_password: `${baseUrl}/change-password`,
            bank_account: `${baseUrl}/bank-account`, //requires auth
            purchase_plan: `${baseUrl}/purchase-plan`, //requires auth // requires /{plan_id} and member_id in post
            withdraw: `${baseUrl}/withdraw-fund`, //requires auth
            transfer_fund: `${baseUrl}/fund-transfer`, //requires auth
            initiate_payment: `${baseUrl}/initiate-payment`, //requires auth
            complete_payment: `${baseUrl}/complete-payment` //requires auth
        },
        get: {
            member_list: `${baseUrl}/member/list`,
            profile: `${baseUrl}/profile`, //requires auth
            password_reset_link: `${baseUrl}/password-reset-link`, //requires auth
            verify_password_link: `${baseUrl}/verify-password-link`, //requires auth
            notifications: `${baseUrl}/notifications`, //requires auth
            statistics: `${baseUrl}/statistics`, //requires auth
            tree: `${baseUrl}/tree`, //requires auth
            members_in_levels: `${baseUrl}/members-in-levels`, //requires auth
            members_in_levels_count: `${baseUrl}/members-in-levels-count`, //requires auth
            bank_account: `${baseUrl}/bank-account`, //requires auth
            payment_options: `${baseUrl}/payment-options/${getUserId()}`, //requires auth
            payment_qr: `${baseUrl}/payment-qr/${getUserId()}`, //requires auth
            plans: `${baseUrl}/plans`, //requires auth
            active_plan: `${baseUrl}/active-plan`, //requires auth
            transactions_history: `${baseUrl}/transactions-history}`, //requires auth
            fund_history: `${baseUrl}/fund-wallet-history`, //requires auth
            withdrawal_history: `${baseUrl}/withdrawal-history`, //requires auth
            level_income_history: `${baseUrl}/level-income-history`, //requires auth
            daily_income_history: `${baseUrl}/daily-income-history`, //requires auth
            direct_income_history: `${baseUrl}/direct-income-history`, //requires auth
            reward_income_history: `${baseUrl}/reward-income-history` //requires auth
        }

    }
}

export default api
export { updateProfile, getUserId }

//way to import this
// import api from '@configs/apiConfig'
