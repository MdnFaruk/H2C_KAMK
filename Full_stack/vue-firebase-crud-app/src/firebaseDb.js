import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyAZICeTfULmAUMiS86-65HzJdEEDsStFa0",
  
    authDomain: "vue-authentication-17b3d.firebaseapp.com",
  
    projectId: "vue-authentication-17b3d",
  
    storageBucket: "vue-authentication-17b3d.appspot.com",
  
    messagingSenderId: "150427073644",
  
    appId: "1:150427073644:web:44a51cb3c186ee4a3a6c49"
  
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();