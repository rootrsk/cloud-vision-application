import store from "../store"
// window.navigator.userAgent = 'react-native';
import io from "socket.io-client/dist/socket.io";
import { updateSensor } from "./sensor";
const FETCH_SOCKET_SUCCESS = 'FETCH_SOCKET_SUCCESS'
const FETCH_SOCKET_FAILURE = 'FETCH_SOCKET_FAILURE'
const FETCH_SOCKET_REQURET = 'FETCH_SOCKET_REQUEST'
const SOCKET_END_POINT = "http://localhost:3001"
const ADD_IMAGE ='ADD_IMAGE'
export async function fetchSocket(){
    console.log("fetchSocket function called.")
    // const socket = io("localhost:3001",{jsonp: false});
    var socket = io("https://rootrsk-cloudvision.herokuapp.com");
    socket.on("connect",()=>{
        console.log("Connection successful")
        addSocket(socket)
    })
    socket.on("sensor-update", (data) => {
        console.log(data)
        updateSensor({...data,A:true})
    })
    socket.on('arduino-update', ({status,sensors}) => {
        if(status==='disconnected'){
            updateSensor({F:false,S:false,U:false,A:false})
        }else if(status==='connected'){
            updateSensor({...sensors,A:true})
        }
        
    })
    socket.on('new-image-uploaded', (image) => {
        // console.log(image)
        // console.log('worked')
        // console.log(store.getState())
        store.dispatch({
            type: ADD_IMAGE,
            image
        })

    })
    console.log("Function end")
}
export async function addSocket(socket){
    store.dispatch({
        type:FETCH_SOCKET_SUCCESS,
        socket
    })
    // console.log(response)
}

export async function removeSocket() {

}

export async function setSocketError(){

}