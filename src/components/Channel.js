import React, {useState, useEffect} from 'react' ;
import firebase from 'firebase/app';
import Message from './Message';
import '../StartitChat.css'
const Channel =(props) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const {uid,displayName, photoURL}= props.user;

    useEffect(() => {
        if(props.db) {
            const unsubscribe = props.db
                .collection('messages')
                .orderBy('createdAt')
                .limit(100)
                .onSnapshot(querySnapshot => {
                    const data = querySnapshot.docs.map(doc => ({
                        ...doc.data(),
                        id:doc.id,
                    }));    
                    setMessages(data);

                })
                
            return unsubscribe;    
        }
    }, [props.db]);

    const handleOnChange = e => {
        setNewMessage(e.target.value); };
    const handleOnSubmit = e => {
        e.preventDefault();    

        if (props.db) {
            props.db.collection('messages').add({
                text: newMessage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                photoURL,
                displayName
            })    


        }
    }


    return ( 
        <div   >
            <ul className="chat">
                {messages.map(message => (
                    <li key={message.id}>
                       <Message {...message}></Message>     
                    </li>
                ))}    
            </ul>      
            <form  onSubmit={handleOnSubmit} >
                <input className="type"
                    type="text"
                    value={newMessage}
                    onChange={handleOnChange}
                    placeholder="Chat Away!"
                />
                <button className="submit" type="submit" disabled={!newMessage}>Send</button>

            </form>
        </div>    
    );
};    



export default Channel;