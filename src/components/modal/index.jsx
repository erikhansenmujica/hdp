import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

function getModalStyle() {
  const top = 30;
  const left = 45;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    maxHeight: 300,
    color: "white",
    backgroundColor: "translucent",
    border: "2px solid white",
    outline: "none",
    zIndex: 1001
  }
}));

export default function SimpleModal({ handleDeshacer, handleEnviar, name }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h1>Votaste a {name}, you sure?</h1>
        </div>
      </Modal>
      <div style={{ position: "absolute", zIndex: 99999, top: 280, left: 350 }}>
        <button className="btn1 btn1--border" onClick={handleDeshacer}>
          <span>DESHACER</span>
        </button>
        <button className="btn1 btn1--future" onClick={handleEnviar}>
          <span>ENVIAR</span>
        </button>
      </div>
    </div>
  );
}
