import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDp8dGassvjCYXq1QK7urBsltGlHSEex38",
  authDomain: "comments-wsinservices.firebaseapp.com",
  databaseURL: "https://comments-wsinservices.firebaseio.com",
  projectId: "comments-wsinservices",
  storageBucket: "comments-wsinservices.appspot.com",
  messagingSenderId: "569105989244"
};
firebase.initializeApp(config);

// export const auth = firebase.auth()
export const database = firebase.database();
export const auth = firebase.auth();
