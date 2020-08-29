import React from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {profile} from '../../redux';
import './navBar.scss';

function NavBar(props) {

    const history = useHistory();

    const logout = event => {
        event.preventDefault();
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="nav">
            <div className="toplogo">
                <div className="search-input"></div>
            </div>

            <div className="user-greet">
                <img
                    onClick={()=> (props.modalIsOpen === true ? null : props.openProfile(props.currentUser.userId))}
                    src={props.currentUser.userPic ?  props.currentUser.userPic : '/generic-avatar.png'}
                    alt={props.currentUser.userName}/>
                <span className="greet">Hello, {props.currentUser.userName}!</span>
                <button onClick={logout}>Log out</button>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        modalIsOpen: state.modals.modalisOpen
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openProfile: (id) => dispatch(profile(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);