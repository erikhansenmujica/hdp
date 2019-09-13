import React from "react";
import "./App.css";
import Home from "./pages/home";
import firebase from "firebase/app";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import store from "./store";
import { createFirestoreInstance } from "redux-firestore"; // <- needed if using firestore

const rrfProps = {
  firebase,
  config: {
    userProfile: "users", // firebase root where user profiles are stored
    useFirestoreForProfile: true // enable/disable Firebase's database logging
  },
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
};

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Home />;
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
