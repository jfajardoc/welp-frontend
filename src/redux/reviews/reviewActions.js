import {GET_REVIEWS, CLEAR_REVIEWS, LIKE, UNLIKE} from './reviewTypes';
import {BASE_URL} from '../../constants';

export const getReviews = reviews => {
    return {
        type: GET_REVIEWS,
        payload: reviews
    }
}

export const clearReviews = () => {
    return {
        type: CLEAR_REVIEWS
    }
}

export const like = (id) => {
    return {
        type: LIKE,
        payload: {
            id: id
        }
    }
}

export const unlike = (id) => {
    return {
        type: UNLIKE,
        payload: {
            id: id
        }
    }
}

export const getReviewsRequest = (id, userId) => {
    return async (dispatch) => {
        await fetch(`${BASE_URL}/locations/${id}/reviews/${userId}`)
        .then(response => response.json())
        .then(reviews => dispatch(getReviews(reviews)));
    }
}

export const newReviewRequest = formData => {
    return async (dispatch) => {
        await fetch(`${BASE_URL}/reviews`, {
            method: 'POST',
            body: formData
        });
    }
}

export const likeReviewRequest = (review, user) => {
    return async (dispatch) => {
        await fetch(`${BASE_URL}/likes`, {
            method: 'POST',
            headers: {
                'Accept': 'Application/json',
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({review_id: review, user_id: user})
        })
        .then(response => response.json())
        .then(data => dispatch(like(data.review_id)));
    }
}

export const unlikeReviewRequest = (review, user) => {
    return async (dispatch) => {
        await fetch(`${BASE_URL}/likes/${review}/${user}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => dispatch(unlike(data.id)));
    }
}