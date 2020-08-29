import {GET_USER} from './userTypes';
import {BASE_URL} from '../../constants';

export const setUser = (user) => {
    return {
        type: GET_USER,
        payload: {
            userId: user.id,
            name: user.name,
            userName: user.username,
            userEmail: user.email,
            userPic: user.profile_pic ? user.profile_pic.url : null
        }
    }
}

export const getUser = (token) => {
    return (dispatch) => {
        fetch(`${BASE_URL}/profile`, {
            method: 'POST',
            headers: {
                'Authorization': token
            }
        })
        .then(response => response.json())
        .then(user => dispatch(setUser(user)));
    };
};