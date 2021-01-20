import React from 'react';
import {likeReviewRequest, unlikeReviewRequest} from '../../redux'
import {connect} from 'react-redux';
import {FaHeart} from 'react-icons/fa';
import './like.scss';

function Like(props) {

    const {author, likes, liked, reviewId, currentUserId, likeReviewRequest, unlikeReviewRequest} = props;

    const handleLike = (review, user) => {
        likeReviewRequest(review, user);
    }

    const handleUnlike = (review, user) => {
        unlikeReviewRequest(review, user);
    }

    const heart = () => {
        if(author === currentUserId) {
            return (
                <FaHeart color="#d3d3d3" size="22" />
                // <span role="img" aria-label="like-inactive">🤍</span>
            )
        } else {
            if(liked === false) {
                return (
                    <FaHeart color="#d3d3d3" size="22" className="like" onClick={()=> handleLike(reviewId, currentUserId)} />
                    // <button onClick={()=> handleLike(reviewId, currentUserId)}>🤍</button>
                    )
                } else {
                    if(liked === true) {
                    return (
                        <FaHeart color="#ff0000" size="22" className="like liked" onClick={()=> handleUnlike(reviewId, currentUserId)} />
                        // <button onClick={()=> handleUnlike(reviewId, currentUserId)}>❤️</button>
                    )
                }
            }
        }
    }

    return (
        <div>
            <p className="like-container">{heart()} &nbsp; {likes === 0 ? null : `(${likes})`}</p>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currentUserId: state.currentUser.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        likeReviewRequest: (reviewId, userId) => dispatch(likeReviewRequest(reviewId, userId)),
        unlikeReviewRequest: (reviewId, userId) => dispatch(unlikeReviewRequest(reviewId, userId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Like);