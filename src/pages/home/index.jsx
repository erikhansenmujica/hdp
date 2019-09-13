import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
const home = ({ todos }) => {
  console.log(todos);
  return (
    <div className="App">
      <header className="App-header">
        <p>erikitu</p>
        <div>
          a:{" "}
          {Array.isArray(todos) &&
            todos.map(names => <p key={names.id}>{names.nombre1}</p>)}
        </div>
      </header>
    </div>
  );
};

export default compose(
  firestoreConnect(() => [{ collection: "nombre" }]), // or { collection: 'todos' }
  connect((state, props) => ({
    todos: state.firestore.ordered.nombre
  }))
)(home);
