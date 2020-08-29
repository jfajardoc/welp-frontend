import {LOGIN_REQUEST} from './loginTypes';

const initialState = {
    currentUser: {
        userId: '',
        userName: ''
    }
}

const loginReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_REQUEST:
            return {
                ...state,
                currentUser: {
                    id: action.payload.userId,
                    username: action.payload.userName
                }
            }
        default:
            return state;
    }
}

export default loginReducer;