import firebaseConfig from "./firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/auth";
import "firebase/database";

const firebaseInit = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
};

firebaseInit();

export { firebase };
