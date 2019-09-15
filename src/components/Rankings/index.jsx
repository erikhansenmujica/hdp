import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "#282c34"
  },
  gridList: {
    width: 420,
    height: 600
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
}));

export default function TitlebarGridList({ users, tipoDeVoto }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile
          key="Subheader"
          cols={2}
          style={{ height: "auto" }}
        ></GridListTile>
        {users.map(user => (
          <GridListTile key={user.profilePhoto}>
            <img src={user.profilePhoto} alt="noPhoto" />
            <GridListTileBar
              title={user.name}
              /*  subtitle={<span>by: {tile.author}</span>} */
              actionIcon={
                <IconButton
                  aria-label={`Cantidad de votos ${user[tipoDeVoto]}`}
                  className={classes.icon}
                >
                  {user[tipoDeVoto]}
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
