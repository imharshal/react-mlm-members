// **  Initial State
const initialState = {
  userData: {}
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PROFILE':
      return {
        ...state,
        userData: action.data  
      }
    default:
      return state
  }
}

export default profileReducer
