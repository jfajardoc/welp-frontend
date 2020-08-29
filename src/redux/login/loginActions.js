import {LOGIN_REQUEST} from './loginTypes';
import {BASE_URL} from '../../constants';

export const loginRequest = (username, password) => {
    return {
        type: LOGIN_REQUEST,
        payload: username, password
    }
}

export const login = (username, password) => {
    return async (dispatch) => {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Accept': 'Application/json',
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({username: username, password: password})
        })
        if(response.status === 200) {
            await response.json().then(data => localStorage.token = `Bearer: ${data.token}`);
            return response;
        } else if(response.status === 422) {
            return response;
        }
    }
}

export const oldsignup = (name, username, email, password) => {
    return async (dispatch) => {
        await fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                'Accept': 'Application/json'
            },
            body: JSON.stringify({name: name, username: username, email: email, password: password})
        })
        .then(response => response.json())
        .then(data => localStorage.token = `Bearer: ${data.token}`)
        .catch(error => {
            return error;
        });
    }
}

export const signup = (name, username, email, password) => {
    return async (dispatch) => {
        const response = await fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'Application/json',
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({name: name, username: username, email: email, password: password})
        })
        if(response.status === 200) {
            await response.json().then(data => localStorage.token = `Bearer: ${data.token}`);
            return response;
        } else if(response.status === 422){
            return response;
        }
    }
}