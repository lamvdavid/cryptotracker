import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";

const stack_Logo =
  "https://upload.wikimedia.org/wikipedia/commons/9/94/MERN-logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    backgroundColor: "#04395e",
    color: "white",
    padding: "8px 0px",
    marginTop: 16,
  },
  logo: {
    maxWidth: "100%",
    maxHeight: 100,
    height: "auto",
    margin: "8px",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={12}>
          <Typography variant="h4">Made by David Lam</Typography>
        </Grid>
        <Grid container direction="row">
          <Grid item xs={12}>
            <Typography variant="h5">Using</Typography>
          </Grid>
          <Grid item xs={12}>
            <img src={stack_Logo} alt="MERN Logo" className={classes.logo} />
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="h4" className={classes.logo}>
              Material UI
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="h4" className={classes.logo}>
              Firebase
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <a
            href="https://nomics.com"
            target="_blank"
            rel="noreferrer"
            className={classes.link}
          >
            Crypto Market Cap &amp; Pricing Data Provided By Nomics
          </a>
        </Grid>
      </Grid>
    </Paper>
  );
}
