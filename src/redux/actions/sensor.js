import store from "../store"
const FETCH_SENSOR_SUCCESS = 'FETCH_SENSOR_SUCCESS'
const FETCH_SENSOR_FAILURE = 'FETCH_SENSOR_FAILURE'
const FETCH_SENSOR_REQURET = 'FETCH_SENSOR_REQUEST'


export function updateSensor(data){
    // console.log(data)
    store.dispatch({
        type: FETCH_SENSOR_SUCCESS,
        data
    })
}