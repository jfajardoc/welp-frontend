import {GET_REVIEWS, CLEAR_REVIEWS, LIKE, UNLIKE} from './reviewTypes';

const initialState = [];
let reviews;

const reviewReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_REVIEWS:
            return action.payload;
        case LIKE:
            reviews = state.reviews.map(review => {
                if(review.id === action.payload.id) {
                    return {
                        ...review,
                        liked: true,
                        likes: review.likes+1
                   }
                } else {
                    return review;
                }
            });
            return {
                ...state,
                reviews
            }
        case UNLIKE:
            reviews = state.reviews.map(review => {
                if(review.id === action.payload.id) {
                    return {
                        ...review,
                        liked: false,
                        likes: review.likes-1
                    }
                } else {
                    return review;
                }
            });
            return {
                ...state,
                reviews
            }
        case CLEAR_REVIEWS:
            return [];
        default:
            return state;
    }
}

export default reviewReducer;