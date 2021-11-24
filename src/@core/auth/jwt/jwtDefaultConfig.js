// ** Auth Endpoints
const BaseUrl = "http://cashmind-api.test/api/v1"
// const BaseUrl = "https://api.cashmind.in/api/v1"
export default {
  loginEndpoint: `${BaseUrl}/login`,
  registerEndpoint: `${BaseUrl}/signup`,
  refreshEndpoint: `${BaseUrl}/refresh-token`,
  logoutEndpoint: `${BaseUrl}/logout`,

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken'
}
