import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { getReviewsRequest, newReview } from '../../redux';
import Review from './Review';
import StarRatingDisplay from './StarRatingDisplay';
import './reviewList.scss'

function ReviewList(props) {

    // const {transitionModalOut, transitionModalIn, locationId, locationName, reviews, getReviews, newReview, userId, score} = props
    const {locationId, locationName, reviews, getReviews, newReview, reviewCount, userId, score} = props

    useEffect(()=> {
        getReviews(locationId, userId);
    }, [getReviews, locationId, userId]);

    const addReview = id => {
        newReview(id, '', '')
    }

    const showReviews = () => {
        if(reviews){
            const reviewCount = reviews.length;
            return reviews.map((review, i) =>{
                if(reviewCount === i+1){
                    return <Review cssClass="review-last" key={review.id} review={review} />
                } else {
                    return <Review cssClass="review-single" key={review.id} review={review} />
                }
            });
        }
    }

    return (
        <div className="review-list-container">
            <div className="review-list-heading">{locationName} <span className="review-count" >{reviewCount} reviews</span><span><StarRatingDisplay score={score}/></span></div>
            <hr className="review-list-heading-separator" />
            <div className="review-list">
                {showReviews()}
            </div>
            <hr className="review-list-bottom-separator" />
            <button className="add-review-button" onClick={()=> {addReview(locationId)}}>Add yours!</button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        locationId: state.modals.locationId,
        locationName: state.reviews.location_name,
        reviewCount: state.reviews.review_count,
        reviews: state.reviews.reviews,
        userId: state.currentUser.userId,
        score: state.reviews.score_avg
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getReviews: async (id, userId) => await dispatch(getReviewsRequest(id, userId)),
        newReview: (id, lat, lng) => dispatch(newReview(id, lat, lng))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);