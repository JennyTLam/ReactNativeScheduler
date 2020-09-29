import * as firebase from 'firebase';

import "firebase/database";
import 'firebase/auth';



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD4vQR8_8O0jKXY6y86yqNIN91vS4fC398",
    authDomain: "scheduler-reactnative.firebaseapp.com",
    databaseURL: "https://scheduler-reactnative.firebaseio.com",
    projectId: "scheduler-reactnative",
    storageBucket: "scheduler-reactnative.appspot.com",
    messagingSenderId: "246879538611",
    appId: "1:246879538611:web:a1b6ed32a3259256aacfc6",
    measurementId: "G-MNXWB5ZNGJ"
};

firebase.initializeApp(firebaseConfig);


export { firebase };