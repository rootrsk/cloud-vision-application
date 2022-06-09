import { getApi } from "../../utils/userApi"
import store from "../store"
const FETCH_IMAGE_SUCCESS = 'FETCH_IMAGE_SUCCESS'
const FETCH_IMAGE_FAILURE = 'FETCH_IMAGE_FAILURE'
const FETCH_IMAGE_REQURET = 'FETCH_IMAGE_REQUEST'
const ADD_IMAGE = 'ADD_IMAGE'
const REMOVE_IMAGE = 'REMOVE_IMAGE'


export async function fetchImage(page=0){
    const {data,error} =await getApi(`/user/images`,`?page=${page}`)
    console.log(data)
    if(error){
        return
    }
    console.log(data)
    store.dispatch({
        type:FETCH_IMAGE_SUCCESS,
        images:data.savedImages
    })
    // console.log(response)
}

export async function deleteImage({_id,callback}){
    // console.log(store.getState().savedImages)
    if (!_id){
        return
    }
    const images = store.getState().savedImages.images
    if (!images){
        return
    }
    
    const filteredImages = images.filter((image)=>{
        return image._id.toString() !== _id.toString()
    })
    await Promise.all(filteredImages)
    console.log(filteredImages)
    store.dispatch({
        type: REMOVE_IMAGE,
        images: filteredImages
    })
    if (callback) callback()
}