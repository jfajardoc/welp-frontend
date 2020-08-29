import {GET_LOCATIONS} from './locationTypes';

const initialState = [];

const locationsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_LOCATIONS:
            return action.payload;
        default:
            return state;
    }
}

export default locationsReducer;