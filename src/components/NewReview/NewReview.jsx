import React, {useState} from 'react';
import {connect} from 'react-redux';
import {closeModal, newLocation, newReviewRequest, reviews, openModal} from '../../redux';
import './newReview.scss';
import StarRating from './StarRating';

function NewReview(props) {

    const [state, setState] = useState({
        locationName: '',
        locationReview: '',
        locationImg: null,
        locationImgUrl: null,
        rating: null,
        hover: null
    });

    const handleRating = (value) => {
        setState({
            ...state,
            rating: value
        });
    }

    const handleHover = (value) => {
        setState({
            ...state,
            hover: value
        });
    }

    const handleFormChange = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    }

    const onImageChange = event => {
        setState({ 
            ...state,
            locationImg: event.target.files[0],
            locationImgUrl: URL.createObjectURL(event.target.files[0])
        }); 
    };

    // new location
    const handleSubmitNewLocation = async event => {
        event.preventDefault();
        let newLocationId;
        await props.newLocation(state.locationName, props.latitude, props.longitude)
        .then(location => {
            let reviewForm = new FormData();
            newLocationId = location.id;
            reviewForm.append('user_id', props.userId);
            reviewForm.append('score', state.rating);
            reviewForm.append('location_id', location.id);
            reviewForm.append('body', state.locationReview);
            if(state.locationImg) {
                reviewForm.append('review_pic', state.locationImg);
            }
            props.newReview(reviewForm);
        });
        props.updateViewport(props.viewport);
        props.reviews(newLocationId)
    }

    // location exists
    const handleSubmitExistingLocation = async event => {
        event.preventDefault();

        let reviewForm = new FormData();
        reviewForm.append('user_id', props.userId);
        reviewForm.append('score', state.rating);
        reviewForm.append('location_id', props.locationId);
        reviewForm.append('body', state.locationReview);
        if(state.locationImg) {
            reviewForm.append('review_pic', state.locationImg);
        }
        await props.newReview(reviewForm);
        props.updateViewport(props.viewport);
        props.reviews(props.locationId)
    }

    const previewPic = () => {
        return state.locationImgUrl ? 
        <div className="review-img-preview-container"><img className="review-img-preview" src={state.locationImgUrl} alt=""/></div> 
        : 
        <div className="review-img-preview-container"><img className="review-img-preview" src='/generic-location.jpg' alt=""/></div> ;
    }

    return (
        props.locationId === '' ?
        <div>
            <h4 className="new-review-heading">This location has no reviews. Be the first to add one!</h4>
            <form onSubmit={handleSubmitNewLocation}>
                <div className="review-location-name-container">
                    <div className="image-container">
                        {previewPic()}
                    </div>
                    <div className="location-name">
                        <label className="location-name-label" htmlFor="locationName">Location name</label>
                        <input className="location-name-input"name="locationName" value={state.locationName} onChange={handleFormChange} type="text"/>
                        <label className="review-image-label" htmlFor="reviewImg">Upload your pic!</label>
                        <input className="review-image-selector" name="reviewImg" type="file" accetp="image/*" multiple={false} onChange={onImageChange}/>
                    </div>
                </div>
                <div className="review-rating-container">
                    <label className="review-rating-label" htmlFor="rating">Your rating:</label>
                    <StarRating rating={state.rating} hover={state.hover} handleRating={handleRating} handleHover={handleHover} />
                </div>
                <div className="review-body-container">
                    <label className="review-body-label" htmlFor="locationReview">Your review</label>
                    <textarea className="review-body-input" name="locationReview" value={state.locationReview} onChange={handleFormChange}></textarea>
                </div>
                <button className="review-submit" type="submit">Save</button>
            </form>
        </div>
        :
        <div>
            <h4 className="new-review-heading">Reviewing {props.locationName}</h4>
                <form onSubmit={handleSubmitExistingLocation}>
                    <div className="review-location-name-container">
                        <div className="image-container">
                            {previewPic()}
                        </div>
                        <div className="location-name">
                            <label className="review-image-label more-margin" htmlFor="reviewImg">Upload your pic!</label>
                            <input className="review-image-selector" name="reviewImg" type="file" accetp="image/*" multiple={false} onChange={onImageChange}/>
                        </div>
                    </div>
                    <div className="review-rating-container">
                        <label className="review-rating-label" htmlFor="rating">Your rating:</label>
                        <StarRating rating={state.rating} hover={state.hover} handleRating={handleRating} handleHover={handleHover} />
                    </div>
                    <div className="review-body-container">
                        <label className="review-body-label" htmlFor="locationReview">Your review</label>
                        <textarea className="review-body-input" name="locationReview" value={state.locationReview} onChange={handleFormChange}></textarea>
                    </div>
                    <button className="review-submit more-margin"type="submit">Save</button>
                </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        latitude: state.modals.latitude,
        longitude: state.modals.longitude,
        locationId: state.modals.locationId,
        locationName: state.reviews.location_name,
        userId: state.currentUser.userId,
        viewport: state.viewport
    }
}

const mapDispatchToProps = dispatch => {
    return {
        newLocation: async (locationName, lat, lng) => await dispatch(newLocation(locationName, lat, lng)),
        newReview: async (formData) => await dispatch(newReviewRequest(formData)),
        openModal: ()=> dispatch(openModal()),
        closeModal: () => dispatch(closeModal()),
        reviews: (id) => dispatch(reviews(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewReview);