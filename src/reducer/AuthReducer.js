var defaultState = {
  auth: null
};

function AuthReducer(state = defaultState, action) {
    const { type, auth } = action
    switch (type) {
        case 'SET_AUTH':
            return auth
        case 'UPDATE_AUTH':
            return { ...state, ...auth }
        default:
            return state
    }
}

export default AuthReducer
