
const baseUrl = "http://cashmind-api.test/api/v1"
const api = {
    baseUrl,
    routes: {
        post: {
            signup: `${baseUrl}/signup`
        },
        get: {
            member_list: `${baseUrl}/member/list`
        }

    }
}

export default api

//way to import this
// import api from '@configs/apiConfig'
