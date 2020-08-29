import {CLOSE_MODAL, REVIEWS, PROFILE, NEW_REVIEW, OPEN_MODAL } from './modalTypes';

export const closeModal = () => {
    return {
        type: CLOSE_MODAL
    }
}

export const openModal = () => {
    return {
        type: OPEN_MODAL
    }
}

export const reviews = (id) => {
    return {
        type: REVIEWS,
        payload: {
            modalType: 'reviewList',
            locationId: id
        }
    }
}

export const profile = (id) => {
    return {
        type: PROFILE,
        payload: {
            modalType: 'profile',
            userId: id
        }
    }
}

export const newReview = (id, lat, lng,) => {
    return {
        type: NEW_REVIEW,
        payload: {
            modalType: 'newReview',
            latitude: lat,
            longitude: lng,
            locationId: id
        }
    }
}