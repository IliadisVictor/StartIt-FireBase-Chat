import React, {useState, useEffect} from 'react';
import './StartitChat.css'
import Navbar from './components/Navbar';
import Lottie from "lottie-react";
import groovyWalkAnimation from "./lottie.json";


import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Button from './components/Button';
import Channel from './components/Channel';

firebase.initializeApp( {
  apiKey: "AIzaSyAUxe09yEb1HH1L75hVuhQtKkICtd725Fo",
  authDomain: "startit-chat-742e6.firebaseapp.com",
  projectId: "startit-chat-742e6",
  storageBucket: "startit-chat-742e6.appspot.com",
  messagingSenderId: "433091938193",
  appId: "1:433091938193:web:ce19690790d955a20b3c30",
  measurementId: "G-DMMJXHJMS9"
});
const auth =firebase.auth();
const firebasedb = firebase.firestore(); 

function App() {
  const [user,setUser] = useState(()  => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
  
    
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      }else {
        setUser(null);
      }  
      if (initializing) {
        setInitializing(false);
      }  
    });

    return unsubscribe;
    
  }, []);  

  

  const signInWithGoogle = async() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    // useDevLang gives us the users preffered language 
    auth.useDeviceLanguage();
    try {
      await auth.signInWithPopup(provider);
    }catch (error) {
      console.error(error);
    }
  };  

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };     






  if (initializing) return "Please Wait ";


  return (
    <div >
      {user ? (
        <div className="wrapper">
          <Navbar>
          </Navbar>
          <div className="container2">
            <h1>Welcome to Startit Chat</h1>
            <Button className="button2" onClick={signOut}  >Sign Out </Button>
            
            <Channel user={user} db={firebasedb}   ></Channel> 
          </div>
        </div>
      ) : (
      <div className="wrapper">
        
        <Navbar></Navbar>
        <div  className="container">
          <div> 
            <h1 className="impact"  >
              StartIt <span>Chat</span> is a chat box created with React and Firebase
            </h1>
            <Button className="button" onClick={signInWithGoogle}> <img src="/images/googleicon.png"></img> </Button>
          </div>
          <Lottie animationData={groovyWalkAnimation} />;
      
         
        </div>
  
        
      </div>
      )}
    </div>
  );
}

export default App;
 