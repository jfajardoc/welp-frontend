import {combineReducers} from 'redux';
import mapReducer from './map/mapReducer';
import locationReducer from './locations/locationsReducer'
import userReducer from './users/userReducer'
import modalReducer from './modals/modalReducer';
import reviewReducer from './reviews/reviewReducer';


const rootReducer = combineReducers({
    viewport: mapReducer,
    locations: locationReducer,
    currentUser: userReducer,
    modals: modalReducer,
    reviews: reviewReducer
});

export default rootReducer;