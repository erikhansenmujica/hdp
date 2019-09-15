import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { FaQuestion } from "react-icons/fa";

const useStyles = makeStyles(theme => ({
  typography: {
    width: "400px",
    backgroundColor: "#00051b",
    color: "beige",
    fontSize: " 20px"
  }
}));

export default function SimplePopover() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        style={{ borderRadius: "100%", height: "60px", width: "60px" }}
      >
        <FaQuestion />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <Typography className={classes.typography}>
          Elegir al hijo de puta de la semana debe ser tomado con humor, por
          favor nada de armar bardo. Un hijo de puta puede ser alguien que contó
          un mal chiste o que se olvidó de lavar un vaso, favor de no votar con
          odio sino con cariño. Muchas gracias.
        </Typography>
      </Popover>
    </div>
  );
}
