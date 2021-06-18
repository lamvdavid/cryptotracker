import {
  Button,
  Grid,
  Card,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { restAPI_uri } from "./Home";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "80%",
      [theme.breakpoints.up("md")]: { width: "600px" },
      margin: "20px 0px 0px 0px",
    },
  },
  form: {
    "& > *": { margin: "10px" },
  },
  button: {
    "& > *": {
      margin: "10px",
      width: "80%",
      [theme.breakpoints.up("md")]: { width: "400px" },
    },
  },
  error: {
    "& > *": {
      backgroundColor: "pink",
      color: "red",
      padding: "8px",
      margin: "8px",
    },
  },
}));

export default function Signup() {
  const classes = useStyles();
  const { signup } = useAuth();
  const history = useHistory();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (pass !== confirm) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, pass);
      await axios
        .post(restAPI_uri + "/users/create", { user: email })
        .then(() => {
          console.log("User: " + email + " has been added");
        })
        .catch((err) => console.log(err));
      history.push("/");
    } catch {
      setError("Failed to create account");
    }
    setLoading(false);
  }

  return (
    <Grid container className={classes.root} justify="center">
      <Grid item xs={12}>
        <Typography variant="h4">Sign Up</Typography>
      </Grid>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid item xs={12} className={classes.error}>
          {error && (
            <Card>
              <Typography className="error">{error}</Typography>
            </Card>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            label="Email"
            value={email}
            type="email"
            fullWidth={true}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="password"
            label="Password"
            value={pass}
            type="password"
            fullWidth={true}
            onChange={(e) => setPass(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="password-confirm"
            label="Password Confirmation"
            value={confirm}
            type="password"
            fullWidth={true}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} className={classes.button}>
          <Button
            disabled={loading}
            variant="contained"
            color="primary"
            type="submit"
          >
            Sign Up
          </Button>
        </Grid>
      </form>
      <Grid item xs={12}>
        <Typography variant="body1">
          Already have an account? <Link to="/login">Log in</Link>
        </Typography>
      </Grid>
    </Grid>
  );
}
