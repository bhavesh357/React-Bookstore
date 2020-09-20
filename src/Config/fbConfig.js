import firebase from 'firebase/app'; 
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyDS32NhuFwZvtRX3qmEXyYN4ifdMTLXKtw",
    authDomain: "bookstore-1a29b.firebaseapp.com",
    databaseURL: "https://bookstore-1a29b.firebaseio.com",
    projectId: "bookstore-1a29b",
    storageBucket: "bookstore-1a29b.appspot.com",
    messagingSenderId: "532688400625",
    appId: "1:532688400625:web:117ca74e3184d2b2e6f950",
    measurementId: "G-4RTJZBP1WE"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({ timestampsInSnapshots: true });

  export default firebase;