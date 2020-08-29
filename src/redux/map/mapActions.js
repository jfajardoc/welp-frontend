import {GET_USER_LOCATION, UPDATE_MAP} from './mapTypes';
import {getLocationsRequest} from '../index'

export const getUserLocation = (lat, lng) => {
    return {
        type: GET_USER_LOCATION,
        payload: {
            latitude: lat,
            longitude: lng
        }
    }
}

export const updateMap = (viewport) => {
    return {
        type: UPDATE_MAP,
        payload: {viewport}
    }
}

export const getUserLocationRequest = () => {
    return dispatch => {
        const geoLocation = navigator.geolocation;
        geoLocation.getCurrentPosition( position => {
            dispatch(getUserLocation(position.coords.latitude, position.coords.longitude));
            dispatch(getLocationsRequest(position.coords.latitude, position.coords.longitude));
        });
    }
}