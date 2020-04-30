// firebase.js
import firebase from 'firebase/app';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyA-eCHfzwyAex3Xg2UQ9h1TShEfhFf5KWg",
    authDomain: "project-five-f9920.firebaseapp.com",
    databaseURL: "https://project-five-f9920.firebaseio.com",
    projectId: "project-five-f9920",
    storageBucket: "project-five-f9920.appspot.com",
    messagingSenderId: "336671408502",
    appId: "1:336671408502:web:13088098ed306641d97a57"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;