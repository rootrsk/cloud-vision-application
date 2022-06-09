const FETCH_SENSOR_SUCCESS = 'FETCH_SENSOR_SUCCESS'
const initialState = {
    F: false,
    U: false,
    S: false,
    A: false,
}

export default function sensorsReducer(state = initialState, action) {
    // console.log(action)
    switch (action.type) {
        case FETCH_SENSOR_SUCCESS:
            console.log('Suceess')
            return {
                ...action.data,
            }
            default:
                return state
    }
}