import useJwt from '@src/auth/jwt/useJwt'
// const baseUrl = "http://cashmind-api.test/api/v1"
const baseUrl = "https://api.cashmind.in/api/v1"
const apiToken = useJwt.getToken()
const userData = JSON.parse(localStorage.getItem('userData'))
const api = {
    baseUrl,
    auth: {
        header: { Authorization: `Bearer ${apiToken}` }
    },
    routes: {
        post: {
            signup: `${baseUrl}/signup`
        },
        get: {
            member_list: `${baseUrl}/member/list`,
            profile: `${baseUrl}/profile`,
            tree: `${baseUrl}/tree/${userData !== null ? userData.id : ''}`
        }

    }
}

export default api

//way to import this
// import api from '@configs/apiConfig'
