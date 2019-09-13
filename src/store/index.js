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
  storageBucket: ""
};
firebase.initializeApp(firebaseConfig);
firebase.firestore();

// Create store with reducers and initial state
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
