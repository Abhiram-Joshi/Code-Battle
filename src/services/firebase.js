import axios from "../utils/axiosForBackend"
// import dotenv from "dotenv";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import cookie from "react-cookies"; 
import firebaseKeys from "../firbaseKeys"
// dotenv.config();

firebase.initializeApp({
  apiKey: firebaseKeys.REACT_APP_API_KEY,
  authDomain: firebaseKeys.REACT_APP_AUTH_DOMAIN,
  databaseURL: firebaseKeys.REACT_APP_DATABASE_URL,
  projectId: firebaseKeys.REACT_APP_PROJECT_ID,
  storageBucket: firebaseKeys.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: firebaseKeys.REACT_APP_MESSAGING_SENDER_ID,
  appId: firebaseKeys.REACT_APP_APP_ID,
  measurementId: firebaseKeys.REACT_APP_MEASUREMENT_ID,
});

export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  (auth
    .signInWithPopup(googleProvider))
    .then((res) => {
      axios.post("/user/create", {
        email: res.user.email,
        uuid: res.credential.idToken,
        password: null,
        isOAuth: true,
      }).then((response) => {
        cookie.save("key", res.user.email, { path: "/" });
        const data = response.data;
        return data;
      })
        .then((data) => {
          console.log(data)
          window.location.href = "/categories"
        })
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export const logOut = () => {
  cookie.remove("key");
  window.location.href = "/"
}