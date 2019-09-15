import React, { Component } from "react";
import { connect } from "react-redux";
import LoginForm from "./Login";
import firebase from "firebase";
import { db } from "../../../store";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = e => {
    const re = /^[a-z0-9]+$/i;
    if (e.target.value === "" || re.test(e.target.value))
      this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(
        this.state.username + "@gmail.com",
        this.state.password
      )
      .catch(error => {
        if (error.code === "auth/wrong-password") {
          alert("Wrong password");
        } else {
          if (window.confirm("Create new user?")) {
            firebase
              .auth()
              .createUserWithEmailAndPassword(
                this.state.username + "@gmail.com",
                this.state.password
              )
              .then(() => {
                const collection = db.collection("users");
                collection
                  .doc(this.state.username)
                  .set({
                    name: this.state.username, // some another information for user you could save it here.
                    password: this.state.password, // some another information for user you could save it here.
                    votos: 0,
                    votosEnElMes: 0,
                    votosEnLaHistoria: 0, // you could save the ID as field in document.
                    YaVoto: false // you could save the ID as field in document.
                  })
                  .then(() => {
                    this.props.history.push("/upload/image");
                    console.log("done");
                  });
              })
              .catch(function(error) {
                alert(error.code + " " + error.message);
              });
          }
        }
      });
  };

  render() {
    return (
      <LoginForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        username={this.state.username}
        password={this.state.password}
      />
    );
  }
}

export default connect()(Login);
