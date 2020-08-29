import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {openModal, profile} from '../../redux';
import {FaUser, FaSignOutAlt} from 'react-icons/fa'
import './navBar.scss';

function Nav(props) {
    // const TOKEN = process.env.REACT_APP_TOKEN;

    const [state, setState] = useState({
        isUserInfoActive: false
    });

    const {openModal, modalIsOpen, openProfile, currentUser} = props

    const history = useHistory();

    const logout = event => {
        event.preventDefault();
        localStorage.clear();
        history.push('/');
    }

    const viewProfile = (id) => {
        openModal();
        openProfile(id);
    }

    const toggleMenu = () => {
        setState({
            isUserInfoActive: !state.isUserInfoActive
        });
    }

    return (
        <div className="nav">
            <div className="toplogo"></div>

            <div onClick={ modalIsOpen ? null : toggleMenu} className="user-greet">
                <img
                    src={currentUser.userPic ?  currentUser.userPic : '/generic-avatar.png'}
                    alt={currentUser.userName}/>
                <span className="greet">{currentUser.name ? currentUser.name : currentUser.userName}</span>
                <span className={state.isUserInfoActive === true ? "arrow active" : "arrow"}></span>
                <ul className={state.isUserInfoActive ? "userInfo userInfo-active" : "userInfo"}>
                    <li onClick={()=> (modalIsOpen === true ? null : viewProfile(currentUser.userId))}><FaUser className="menu-icons" color="#e4e5e9" />Profile</li>
                    <li onClick={logout} ><FaSignOutAlt className="menu-icons" color="#e4e5e9"/> Log out</li>
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        modalIsOpen: state.modals.modalIsOpen,
        modalType: state.modals.modalType
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openModal: () => dispatch(openModal()),
        openProfile: (id) => dispatch(profile(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);