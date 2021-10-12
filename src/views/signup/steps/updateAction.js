export function insertAction(state, payload) {
    return {
        signupForm: {
            ...state,
            ...payload
        }
    }
}
export function updateAction(state, payload) {
    return {
        ...state,
        ...payload
    }
}

export function clearAction(state, payload) {
    return {}
}