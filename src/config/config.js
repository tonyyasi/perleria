import firebase from 'firebase'

  var config = {
    apiKey: "AIzaSyCleYAEMZDUH9d5NjawVdlcUeOXb2l8xqQ",
    authDomain: "perleria-9e873.firebaseapp.com",
    databaseURL: "https://perleria-9e873.firebaseio.com",
    projectId: "perleria-9e873",
    storageBucket: "perleria-9e873.appspot.com",
    messagingSenderId: "613970623697"
  };
  
  const appTokenKey = "appToken";

  firebase.initializeApp(config);
  
  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  export const database = firebase.database();
  export const firebaseAuth = firebase.auth;
  
  export function validateSession() {
      if (localStorage.getItem(appTokenKey)) {
          return true;
      } else {
          return false;
      }
  }