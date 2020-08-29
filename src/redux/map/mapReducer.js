import {GET_USER_LOCATION, UPDATE_MAP} from './mapTypes';

const initialState = {
        width: "100vw",
        height: "100vh",
        latitude: 0,
        longitude: 0,
        zoom: 15
}

const mapReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_USER_LOCATION:
            return {
                ...state,
                latitude: action.payload.latitude,
                longitude: action.payload.longitude
            }
        case UPDATE_MAP:
            return {
                ...state,
                ...action.payload.viewport
            }
        default:
            return state;
    }
}

export default mapReducer;