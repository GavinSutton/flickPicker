// firebase.js
import firebase from 'firebase/app';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyBLU-yEKVmTF15M3bs5GPbhJHXXHuxze2k",
    authDomain: "bookshelf-eadaf.firebaseapp.com",
    databaseURL: "https://bookshelf-eadaf.firebaseio.com",
    projectId: "bookshelf-eadaf",
    storageBucket: "bookshelf-eadaf.appspot.com",
    messagingSenderId: "550756219812",
    appId: "1:550756219812:web:08d0101ea5e2976b35df31"
};

firebase.initializeApp(firebaseConfig);

export default firebase;