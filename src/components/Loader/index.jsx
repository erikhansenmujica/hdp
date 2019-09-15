import React from "react";
import s from "./loader.module.scss";

function randomSpinners() {
  const arr = [];
  for (let i = 0; i < Math.ceil(Math.random() * 5); i++) {
    arr.push(i + 1);
  }
  return arr;
}

export default () => (
  <div className={s.spinner}>
    <div className={s.skere}>
      <img
        src={require("./plataforma5-logo-500px.jpg")}
        alt=""
        className={s.img}
      />
    </div>
    {randomSpinners().map(spinner => (
      <div key={spinner} className={s[`loader${spinner}`]} />
    ))}
  </div>
);
