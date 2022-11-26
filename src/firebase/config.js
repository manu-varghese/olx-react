
import firebase from "firebase";
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCBgsq5WASwL7H4Tuuv0nTjdGAfjgI6pak",
    authDomain: "olx-clone-33f86.firebaseapp.com",
    projectId: "olx-clone-33f86",
    storageBucket: "olx-clone-33f86.appspot.com",
    messagingSenderId: "886827560998",
    appId: "1:886827560998:web:5906598f142dee2b54b6e7",
    measurementId: "G-0T922749MY"
  };

  export default firebase.initializeApp(firebaseConfig)