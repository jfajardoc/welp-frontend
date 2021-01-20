import React from 'react';

function ValidationMessage(props) {

    const errorMsg = props.message ? <div className='error-msg'>{props.message}</div> : null;

    return (
        <div>
            {errorMsg}
        </div>
    )
}

export default ValidationMessage;