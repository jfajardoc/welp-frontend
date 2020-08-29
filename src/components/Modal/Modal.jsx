import React, {useRef} from 'react';
import {connect} from 'react-redux';
import {closeModal, clearReviews} from '../../redux';
import Profile from '../Profile/Profile';
import NewReview from '../NewReview/NewReview';
import ReviewList from '../ReviewList/ReviewList';
import './modal.scss';

function Modal(props) {

    // Creating a couple of refs to target the CSS class swap
    const overlay = useRef(null);
    const modalContents = useRef(null);
    
    // Grab the modal backdrop and the contents, then add a CSS class to fade them out, then wait 150ms before changing the state (Animation takes 200ms)
    const handleModalClose = () => {
        let element = overlay;
        let modal = modalContents;

        modal.current.classList.add('slider-out');
        element.current.classList.add('fader-out');
        setTimeout(()=>{
            props.closeModal();
            if(props.modalType === 'reviewList') {
                props.clearReviews();
            }
        }, 150);
    }

    const transitionModalOut = () => {
        let modal = modalContents;
        modal.current.classList.remove('slider-in');
        modal.current.classList.add('slider-out');
    }
    
    const transitionModalIn = () => {
        let modal = modalContents;
        setTimeout(()=> {
            modal.current.classList.remove('slider-out');
            modal.current.classList.add('slider-in');
        },150);
    }

    const modalType = () => {
        switch(props.modalType) {
            case 'profile':
                return <Profile handleModalClose={handleModalClose} />;
            case 'newReview':
                return <NewReview updateViewport={props.updateViewport} transitionModalIn={transitionModalIn} transitionModalOut={transitionModalOut} />;
            case 'reviewList':
                return <ReviewList transitionModalIn={transitionModalIn} transitionModalOut={transitionModalOut} />
            default:
                return null;
        }
    }

    return (
        props.modalIsOpen === true ?
        <>
            <div ref={overlay} onClick={() => {handleModalClose()}} id="overlay" className={props.modalIsOpen === true ? "fader-in profile-modal-backdrop" : "fader-out profile-modal-backdrop"}></div>
                <div ref={modalContents}  className={props.modalIsOpen === true ? "slider-in profile-modal-contents" : "slider-out profile-modal-contents"}>
                    <div className="close-button">
                        <button onClick={() => {handleModalClose()}}><span role="img" aria-label="close">❌</span></button>
                    </div>
                    {modalType()}
                </div>
            </>
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
export default connect(mapStateToProps, mapDispatchToProps)(Modal);