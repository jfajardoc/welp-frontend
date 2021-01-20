import React, {useState} from 'react'
import {connect}  from 'react-redux';
import { getUser, closeModal } from '../../redux';
import EditableField from '../EditableField/EditableField';
import {IconContext} from 'react-icons';
import {FaPencilAlt, FaCheck} from 'react-icons/fa';
import {BASE_URL} from '../../constants';
import './profile.scss';

function Profile(props) {

    // The state in this component is too local to use Redux, hence the use of state here.
    // image will be the image uploaded by the form that will be sent to the server.
    // imageUrl will be a temporary url gotten from the form before uploading for previewing.
    const [state, setState] = useState({
        image: null,
        imageUrl: null
    });

       // The handler for the two state keys. It sets both the image for sending as well as a temporary URL to display a preview
       const onImageChange = event => {
        setState({ 
            ...state,
            image: event.target.files[0],
            imageUrl: URL.createObjectURL(event.target.files[0])
        }); 
    };
    
    // The handler for the form submission.
    const handleSubmit = async event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('profile_pic', state.image);

        await fetch(`${BASE_URL}/profile/${props.currentUser.userId}`, {
            method: 'PATCH',
            body: formData
        }).then(response => response.json());
        props.getUser(localStorage.token);
        props.closeModal();
    }

    return (
        <div>
            <h4 className="profile-header">{props.currentUser.name ? props.currentUser.userName : props.currentUser.name}</h4>
            <img className="img-preview" src={state.imageUrl ? state.imageUrl : props.currentUser.userPic ? props.currentUser.userPic : '/generic-avatar.png'} alt=""/>
                            <form onSubmit={handleSubmit}>
                            <div className="user-image">
                                <label htmlFor="edit-img">
                                    <IconContext.Provider value={{className: "edit-button"}}>
                                        <FaPencilAlt />
                                    </IconContext.Provider>
                                </label>
                                <button className="submit-img" type="submit">
                                    <IconContext.Provider value={{className: "submit-button"}}>
                                        <FaCheck />
                                    </IconContext.Provider>
                                </button>
                                <input id="edit-img" type="file" accept="image/*" multiple={false} onChange={onImageChange} />
                            </div>
                            </form>
                    <hr className="profile-pic-separator" />
                    <div className="profile-container">
                        <div className="left-column">
                            <h4>Your name:</h4>
                            <EditableField getUser={props.getUser} id={props.currentUser.userId} field={'name'} name={props.currentUser.name}/>
                            <h4>Your username:</h4>
                            <EditableField getUser={props.getUser} id={props.currentUser.userId} field={'username'} name={props.currentUser.userName}/>
                            <h4>Your email:</h4>
                            <EditableField getUser={props.getUser} id={props.currentUser.userId} field={'email'} name={props.currentUser.userEmail}/>
                        </div>
                        <div className="right-column">
                            
                        </div>
                    </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUser: (token) => dispatch(getUser(token)),
        closeModal: () => dispatch(closeModal())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);