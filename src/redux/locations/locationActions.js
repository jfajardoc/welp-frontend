import {GET_LOCATIONS} from './locationTypes';
import {BASE_URL} from '../../constants';

export const getLocations = locations => {
    return {
        type: GET_LOCATIONS,
        payload: locations
    }
}

export const getLocationsRequest = (lat, lng) => {
    return async (dispatch) => {
        await fetch(`${BASE_URL}/locations/${lat}/${lng}`)
        .then(response => response.json())
        .then(locations => dispatch(getLocations(locations)));
    }
}

export const newLocation = (locationName, lat, lng) => {
    return async (dispatch) => {
        let newLocation;
        await fetch(`${BASE_URL}/locations`, {
            method: 'POST',
            headers: {
                'Accept': 'Application/json',
                'Content-type': 'Application/json'
            },
            body: JSON.stringify({
                location_name: locationName,
                lat: lat,
                lng: lng
            })
        })
        .then(response => response.json())
        .then(location => newLocation = location);
        return newLocation;
    }
}