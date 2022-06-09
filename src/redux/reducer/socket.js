const FETCH_SOCKET_SUCCESS = 'FETCH_SOCKET_SUCCESS'
const FETCH_SOCKET_FAILURE = 'FETCH_SOCKET_FAILURE'
const FETCH_SOCKET_REQURET = 'FETCH_SOCKET_REQUEST'

const initialState = {
    socket:null
}

export default function socketReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_SOCKET_SUCCESS:
            return {
                socket: action.socket
            }
        default:
            return state
    }
}