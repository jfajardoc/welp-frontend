import React from 'react';
import {connect} from 'react-redux';
import {closeModal, clearReviews} from '../../redux';
import Profile from '../Profile/Profile';
import NewReview from '../NewReview/NewReview';
import ReviewList from '../ReviewList/ReviewList';
import './newModal.scss';

function NewModal(props) {

    const {modalIsOpen, closeModal, clearReviews, modalType} = props;
  
    const getModalContents = () => {
        switch(modalType) {
            case 'profile':
                return <Profile />;
            case 'newReview':
                return <NewReview updateViewport={props.updateViewport} />;
            case 'reviewList':
                return <ReviewList />
            default:
                return null;
        }
    }

    const handleClick = () => {
        closeModal();
        clearReviews();
    }

    return (
        modalIsOpen ?
            <div className={modalIsOpen ? "modal-overlay-display fadeIn" : "fadeOut modal-overlay-hidden"} onClick={handleClick}>
                <div className="modal-content" onClick={event => event.stopPropagation()}>
                    <div className="close-button">
                        <span className="close" onClick={handleClick}>&times;</span>
                    </div>
                    <div className="modal-inner-container">
                        {getModalContents()}
                    </div>
                </div>
            </div>
        : null
    )
}

// We still need to bring some info from the state...
const mapStateToProps = state => {
    return {
        modalIsOpen: state.modals.modalIsOpen,
        modalType: state.modals.modalType
    }
}

// ...as well as some actions...
const mapDispatchToProps = dispatch => {
    return {
        closeModal: ()=> dispatch(closeModal()),
        clearReviews: ()=> dispatch(clearReviews())
    }
}

// ...and send them as props.
export default connect(mapStateToProps, mapDispatchToProps)(NewModal);