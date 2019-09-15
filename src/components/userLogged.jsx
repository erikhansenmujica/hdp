import React from "react";
import firebase from "firebase";

export default ({ handleChange, history }) => {
  return (
    <div>
      {firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          handleChange("yes", user);
        } else {
          handleChange("no");
        }
      })}
    </div>
  );
};
