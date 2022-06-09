import { createStore,combineReducers } from 'redux'
import authReducer from './reducer/auth'
import imageReducer from './reducer/image'
import sensorsReducer from './reducer/sensor'
import socketReducer from './reducer/socket'

const store = createStore(
    combineReducers({
        auth : authReducer,
        savedImages: imageReducer,
        socketConnection: socketReducer,
        sensors: sensorsReducer
    })
)

export default store