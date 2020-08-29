import {GET_USER} from './userTypes';

const initialState = {
    userId: '',
    name: '',
    userName: '',
    userEmail: '',
    userPic: ''
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USER:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

export default userReducer;