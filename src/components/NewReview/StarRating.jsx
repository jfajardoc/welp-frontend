import React from 'react';
import {FaStar} from 'react-icons/fa';
import './newReview.scss'

function StarRating(props) {

    const {rating, hover, handleHover, handleRating} = props;

    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i+1;
                return <label key={i}>
                    <input type="radio" name="rating" value={ratingValue} onClick={() => handleRating(ratingValue)} />
                    <FaStar
                        key={i}
                        className="star"
                        size={30}
                        color={ratingValue <= (hover || rating) ? "#ffc107": "#e4e5e9"}
                        onMouseEnter={()=>handleHover(ratingValue)}
                        onMouseLeave={()=>handleHover(null)}
                    />
                    </label>
            })} <span>{rating} {rating < 2 ? 'star' : 'stars'}</span>
        </div>
    )
}

export default StarRating;