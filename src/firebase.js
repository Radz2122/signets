import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import 'firebase/firestore';

// Configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCQAztvvcvke-wpmASPjs1jVWuqUFL3gdQ",
    authDomain: "signets-b5ec7.firebaseapp.com",
    projectId: "signets-b5ec7",
    storageBucket: "signets-b5ec7.appspot.com",
    messagingSenderId: "835294749593",
    appId: "1:835294749593:web:5dab593e7a65c7e6a8a908"
};

// Initialiser Firebase
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialiser FirebaseUI
export const instanceFirebaseUI = new firebaseui.auth.AuthUI(firebase.auth());

// Initialiser Firestore
export const firestore = firebase.firestore();
