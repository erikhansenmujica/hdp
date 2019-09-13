import { firestoreReducer } from "redux-firestore";
import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
export default combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});
