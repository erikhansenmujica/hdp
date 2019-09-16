import React, { useState } from "react";
import "./App.scss";
import Home from "./pages/home";
import firebase from "firebase/app";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { store } from "./store";
import { createFirestoreInstance } from "redux-firestore"; // <- needed if using firestore
import Login from "./pages/registerLogin/Login";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import UserLogged from "./components/userLogged";
import Loader from "./components/Loader";
import ImageUploader from "./pages/imageUploader";
import Condiciones from "./components/condiciones";
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
  const [logged, setLogged] = useState({
    logged: false
  });
  const handleChange = (logged, user) =>
    setLogged({ logged: logged, user: user });
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <div className="condiciones">
          <Condiciones />
        </div>
        {!logged.logged && (
          <div>
            <UserLogged handleChange={handleChange} />
            <Loader />
          </div>
        )}
        {logged.logged === "yes" && (
          <BrowserRouter>
            <Route exact path="/home" component={Home} />
            <Route exact path="/upload/image" component={ImageUploader} />
            {!window.location.href.includes("/upload/image") ? (
              !logged.user.photoURL ? (
                <Redirect to="/upload/image" />
              ) : (
                <Redirect from="/" to="/home" />
              )
            ) : !logged.user.photoURL ? (
              <Redirect to="/upload/image" />
            ) : (
              <Redirect from="/" to="/home" />
            )}
          </BrowserRouter>
        )}
        {logged.logged === "no" && (
          <BrowserRouter>
            <Route path="/" component={Login} />
            <Redirect from="/" to="/" />
          </BrowserRouter>
        )}
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
