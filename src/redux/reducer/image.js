
const FETCH_IMAGE_SUCCESS = 'FETCH_IMAGE_SUCCESS'
const FETCH_IMAGE_FAILURE = 'FETCH_IMAGE_FAILURE'
const FETCH_IMAGE_REQURET = 'FETCH_IMAGE_REQUEST'
const REMOVE_IMAGE = 'REMOVE_IMAGE'
const ADD_IMAGE = 'ADD_IMAGE'
const initialState = {
    images:[],
    isLoading:false
}

export default function images(state = initialState, action) {
    switch (action.type) {
        case FETCH_IMAGE_REQURET:
            return {
                isLoading:true,
                images: [...state.images]
            }
        case FETCH_IMAGE_SUCCESS:
            return {
                images:action.images
            }
        case ADD_IMAGE:
            // console.log(state)
            return {
                images: [action.image,...state.images ]
            }
        case REMOVE_IMAGE:
            return {
                images:[...action.images]
            }
        default:
            return state
    }
}