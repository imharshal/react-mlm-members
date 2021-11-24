// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'

const config = useJwt.jwtConfig
// ** Handle User Login
export const handleProfileUpdate = data => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_PROFILE',
      data,
      config
    })

    // ** Add to user, accessToken & refreshToken to localStorage
    localStorage.setItem('userData', JSON.stringify(data))
    // localStorage.setItem(config.storageTokenKeyName, data.accessToken)
    // localStorage.setItem(config.storageRefreshTokenKeyName, JSON.stringify(JSON.stringify(data.refreshToken)))
  }
}

