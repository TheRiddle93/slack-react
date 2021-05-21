// imports firebase module from "firebase" module inside node_modules, that is needed to run the application with firebase and the database firestore.
import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// configuration for the firebase application.
const firebaseConfig = {
  apiKey: "AIzaSyBe4jAC6TPRdgnKgrTtATD6vwlumH_eqms",
  authDomain: "slack-app-fc441.firebaseapp.com",
  projectId: "slack-app-fc441",
  storageBucket: "slack-app-fc441.appspot.com",
  messagingSenderId: "268374820759",
  appId: "1:268374820759:web:9bdbc6a1867df91885e6d2",
  measurementId: "G-S97E9JZF41",
};

// firebaseApp is the app that is initialized using the firebaseConfig. initializeApp() is the method function that initializes the app using the firebaseConfig as argument/input.
const firebaseApp = firebase.initializeApp(firebaseConfig);

// db is using the initialized app firebaseApp with the .firestore() method function which creates the firebase database (firestore) for the application.
const db = firebaseApp.firestore();
// creates an auth object with firebase authentication function .auth()
const auth = firebase.auth();
// creates a provider object with new firebase authentication with GoogleAuthProvider() function. Lets Google be the authentication Provider. new keyword creates a blank, plain user-defined JavaScript object or a built-in object with a constructor function.
const provider = new firebase.auth.GoogleAuthProvider();

export default db;
export { auth, provider };
