import React from 'react';
import {formatRelative} from 'date-fns' ;
import '../StartitChat.css'

const Message = ( { 
    createdAt=null,
    text = '',
    displayName='',
    photoURL = '',
}) => {
    return (
    <div className="message">
        {photoURL ? (
            <img className="userimg" src={photoURL} alt="Stock" width={45} height={45}/>
             ):null}
             
        {displayName? <p className="username"> {displayName}</p> :null}
        {createdAt?.seconds ? (
            <span className="time">
                {formatRelative(new Date(createdAt.seconds*1000), new Date() )}
            </span>    
        ): null}
        <p className="usertext">{text}</p>
    </div>
    );
};

export default Message;