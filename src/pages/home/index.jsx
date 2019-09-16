import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import firebase from "firebase";
import { db } from "../../store";
import Modal from "../../components/modal";
import Rankings from "../../components/Rankings";

const Home = ({ users }) => {
  const initialState = {
    isSomeoneChecked: false,
    enviado: true
  };
  const [state, setState] = useState(initialState);
  const handleChange = name => event => {
    setState({
      ...state,
      [name]: true,
      isSomeoneChecked: true,
      enviado: false,
      seleccionado: name
    });
  };
  const handleDeshacer = () => {
    setState({
      isSomeoneChecked: false
    });
  };
  const handleEnviar = () => {
    let user = "";
    // eslint-disable-next-line no-unused-vars
    for (const key in state) {
      if (
        key !== "isSomeoneChecked" &&
        key !== "enviado" &&
        key !== "seleccionado" &&
        state[key]
      )
        user = key;
    }
    user = user
      .split("")
      .splice(0, user.length - 1)
      .join("");
    const userData = users.filter(user1 => user1.name === user)[0];
    db.collection("users")
      .doc(user)
      .update({
        votos: userData.votos + 1,
        votosEnElMes: userData.votosEnElMes + 1,
        votosEnLaHistoria: userData.votosEnLaHistoria + 1
      })
      .then(() => {
        db.collection("users")
          .doc(firebase.auth().currentUser.email.split("@")[0])
          .update({
            YaVoto: true
          })
          .then(() => {
            setState({ ...state, enviado: true });
          });
      });
  };
  const handleLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
      })
      .catch(function(error) {
        // An error happened.
      });
  };
  if (Array.isArray(users)) {
    const currentUser = users.filter(
      user => user.name === firebase.auth().currentUser.email.split("@")[0]
    )[0];
    users.forEach((names, i) => (initialState[names.name + i] = false));
    if (Object.keys(state).length <= 1) {
      setState(initialState);
    }
    (() => {
      // eslint-disable-next-line no-unused-vars
      for (let key in state) {
        if (key !== "isSomeoneChecked") if (state[key]) return "none";
      }
      if (state.isSomeoneChecked)
        setState({ ...state, isSomeoneChecked: false });
    })();
    return (
      <div className="App">
        {state.enviado ? (
          currentUser && !currentUser.YaVoto ? (
            <header className="App-header">
              <div className="header">
                <button className="btn2 btn2--swap" onClick={handleLogOut}>
                  {firebase.auth().currentUser.email.split("@")[0]}
                  <span>LOGOUT</span>
                </button>
              </div>
              <div className="HijosDePutaContainer">
                {Array.isArray(users) &&
                  users.map((names, i) => {
                    if (
                      names.name !==
                      firebase.auth().currentUser.email.split("@")[0]
                    )
                      return (
                        <div
                          key={names.id}
                          style={{
                            backgroundImage: `url(${names.profilePhoto})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "350px",
                            backgroundPosition: "center"
                          }}
                          className="cajasHijosDePuta"
                          onClick={handleChange(
                            names.name + i,
                            state[names.name + i]
                          )}
                          value={names.name + i}
                        >
                          <div className="nombres">
                            <p>{names.name}</p>
                          </div>
                        </div>
                      );
                  })}
              </div>
            </header>
          ) : (
            <div>
              <div className="yaVotastes">
                <h1>YA VOTASTE : )</h1>
              </div>
              <button className="btn2 btn2--swap" onClick={handleLogOut}>
                {firebase.auth().currentUser.email.split("@")[0]}
                <span>LOGOUT</span>
              </button>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginBottom: "50px"
                }}
              >
                <div className="OneRanking">
                  <h3 style={{ color: "white" }}> Ganador de esta semana </h3>
                  <Rankings
                    users={JSON.parse(JSON.stringify(users)).sort((us1, us2) =>
                      us1.votos > us2.votos ? -1 : 1
                    )}
                    tipoDeVoto="votos"
                  />
                </div>
                <div className="OneRanking">
                  <h3 style={{ color: "white" }}> Ganador de este mes </h3>
                  <Rankings
                    users={JSON.parse(JSON.stringify(users)).sort((us1, us2) =>
                      us1.votosEnElMes > us2.votosEnElMes ? -1 : 1
                    )}
                    tipoDeVoto="votosEnElMes"
                  />
                </div>
                <div className="OneRanking">
                  <h3 style={{ color: "white" }}>
                    El mas hijo de puta de la historia{" "}
                  </h3>
                  <Rankings
                    users={JSON.parse(JSON.stringify(users)).sort((us1, us2) =>
                      us1.votosEnLaHistoria > us2.votosEnLaHistoria ? -1 : 1
                    )}
                    tipoDeVoto="votosEnLaHistoria"
                  />
                </div>
              </div>
            </div>
          )
        ) : (
          <Modal
            name={state.seleccionado}
            handleDeshacer={handleDeshacer}
            handleEnviar={handleEnviar}
          />
        )}
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default compose(
  firestoreConnect(() => [{ collection: "users" }]), // or { collection: 'users' }
  connect((state, props) => ({
    users: state.firestore.ordered.users
  }))
)(Home);
