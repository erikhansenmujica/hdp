import React from "react";
import TextField from "@material-ui/core/TextField";
import s from "./login.module.scss";
import Button from "@material-ui/core/Button";
import { FaUserCircle, FaKey } from "react-icons/fa";

export default ({ handleChange, handleSubmit, username, password }) => {
  return (
    <div className={s.body}>
      <h1
        style={{
          color: "beige",
          marginTop: "100px",
          marginBottom: "-100px"
        }}
      >
        EL HIJO DE PUTA DE LA SEMANA
      </h1>
      <p className={s.subtitle}>
        (Nombre sin espacio y en minuscula, solo letras y numeros sino no podes
        votar)
      </p>
      <div className={s.logInBox}>
        <h1 style={{ marginTop: "-20px", color: "" }}>Hello</h1>
        <form onSubmit={handleSubmit}>
          <div className={s.logInInput}>
            <FaUserCircle size="50" />
            <TextField
              onChange={handleChange}
              label="Username"
              name="username"
              value={username}
              style={{ margin: 8, width: "95%" }}
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
          <div className={s.logInInput}>
            <FaKey size="50" />
            <TextField
              type="password"
              onChange={handleChange}
              label="Password"
              name="password"
              value={password}
              style={{ margin: 8, width: "95%" }}
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
          <div style={{ marginBottom: "-20px" }}>
            <Button
              type="submit"
              style={{ width: "30%" }}
              variant="contained"
              size="small"
            >
              Log In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
