import React from 'react';
import Like from './Like';
import './review.scss';
import StarRatingDisplay from './StarRatingDisplay';

function Review(props) {
    const {body, id, liked, likes, review_pic, score, userId, profile_pic, userName} = props.review;
    const {cssClass} = props;

    const reviewImg = () => {
        return review_pic ? <div className="card-img"><img className="review_image" src={review_pic.url} alt="Review location" /></div> : null;
    }
    

    const userPic = () => {
        return profile_pic ? <div className="user-pic"><img src={profile_pic.userPicUrl} alt="Author" className="review-author"/></div> : null;
    }

    return (
        <div className={cssClass}>
            <div className="card">
                    {reviewImg()}
                <div className="card-body">
                    <div className="meta-container">
                            {userPic()}
                        <div className="rating-container">
                            <h5>{userName} <StarRatingDisplay score={score} /></h5>
                        </div>
                    </div>
                    <p className="review-body">{body}</p>
                    <Like reviewId={id} likes={likes} liked={liked} author={userId}/>
                </div>
            </div>
        </div>
    )
}

export default Review;