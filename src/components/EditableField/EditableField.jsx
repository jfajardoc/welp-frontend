import React, {useState} from 'react';
import {FaPencilAlt, FaCheck, FaTimes} from 'react-icons/fa';
import './editableField.scss';

function EditableField(props) {

    const [state, setState] = useState({
        value: '',
        isEditModeOn: false
    });

    const toggleEditMode = () => {
        setState({
            ...state,
            isEditModeOn: !state.isEditModeOn
        })
    }

    const handleChange = event => {
        setState({
            ...state,
            value: event.target.value
        })
    }
    
    const handleSubmit = async event => {
        event.preventDefault();
        await fetch(`/profile/${props.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({[props.field.toString()]: state.value})
        }).then(response => response.json())
        .then(data => localStorage.token = `Bearer: ${data.token}`);
        toggleEditMode();
        props.getUser(localStorage.token);
    }
    
    const renderDefaultView = () => {
        return <div>
            <p className="editable-field-p">{state.value ? state.value : props.name} <button className="edit-field-button" onClick={toggleEditMode}><FaPencilAlt /></button></p>
        </div>
    }

    const renderEditView = () => {
        return <div>
            <form className="field-container" onSubmit={handleSubmit}>
                <input
                className="editable-field"
                type="text"
                defaultValue={props.name}
                name={props.field}
                onChange={handleChange}
                /> <button className="submit-button" type="submit"><FaCheck /></button> <button className="cancel-button" onClick={toggleEditMode}><FaTimes /></button>
                
            </form>
        </div>
    }

    return (
        state.isEditModeOn ? renderEditView() : renderDefaultView()
    )
}

export default EditableField;