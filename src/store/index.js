import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk"; // no changes here 😀
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import rootReducer from "./reducer";
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAskU1Aap-bgcvndJloh9f_sIiHY_IKveo",
  authDomain: "hijodeputa-5f1a1.firebaseapp.com",
  databaseURL: "https://hijodeputa-5f1a1.firebaseio.com",
  projectId: "hijodeputa-5f1a1",
  storageBucket: "hijodeputa-5f1a1.appspot.com"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
// Create store with reducers and initial state
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export { store, db, storage };
