import {OPEN_MODAL, CLOSE_MODAL, REVIEWS, PROFILE, NEW_REVIEW} from './modalTypes';

const initialState = {
    modalIsOpen: false,
    modalType: '',
    longitude: '',
    latitude: '',
    locationId: '',
    userId: ''
}

const modalReducer = (state = initialState, action) => {
    switch(action.type){
        case CLOSE_MODAL:
            return {
                ...state,
                modalIsOpen: false,
                modalType: '',
                longitude: '',
                latitude: '',
                locationId: '',
                userId: ''
            }
        case OPEN_MODAL:
            return {
                ...state,
                modalIsOpen: true
            }
        case PROFILE:
            return {
                ...state,
                //modalIsOpen: !state.modalIsOpen,
                userId: state.modalIsOpen === true && state.modalType === 'profile' ? '' : action.payload.userId,
                modalType: action.payload.modalType
            }
        case NEW_REVIEW:
            return {
                ...state,
                //modalIsOpen: state.modalIsOpen === true ? state.modalIsOpen : !state.modalIsOpen,
                modalType: action.payload.modalType,
                locationId: action.payload.locationId,
                longitude: state.modalIsOpen === true && state.modalType === 'map' ? '' : action.payload.longitude, 
                latitude: state.modalIsOpen === true && state.modalType === 'map' ? '' : action.payload.latitude
            }
        case REVIEWS:
            return {
                ...state,
                //modalIsOpen: state.modalIsOpen === true ? state.modalIsOpen : !state.modalIsOpen,
                modalType: action.payload.modalType,
                locationId: state.modalIsOpen === true && state.modalType === 'location' ? '' : action.payload.locationId
            }
        default:
            return state;
    }
}

export default modalReducer;