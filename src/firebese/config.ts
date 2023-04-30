import firebase from "firebase/app";
import "firebase/firestore";
// In firebase web we allow in authentication to use this package
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCvga0gk0IVz_OOSURDcWJGeGkIHmba6DE",
  authDomain: "mymoney-cc3db.firebaseapp.com",
  projectId: "mymoney-cc3db",
  storageBucket: "mymoney-cc3db.appspot.com",
  messagingSenderId: "321967346292",
  appId: "1:321967346292:web:1e35780ca1d35488583721",
};

// init firebase service
firebase.initializeApp(firebaseConfig);

// init service
const projectFirestore = firebase.firestore();

// this can be use for example to signin/signout or login/logout users
// every time we interact with this object(projectAuth) it sent request to our database
// on signup or login it will return a token for user that is login in - data protection
const projectAuth = firebase.auth();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
