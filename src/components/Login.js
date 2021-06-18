import {
  Button,
  Grid,
  Card,
  makeStyles,
  TextField,
  Typography,
  Paper,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

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

export default function Login() {
  const classes = useStyles();
  const { login } = useAuth();
  const history = useHistory();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, pass);
      history.push("/");
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  }

  return (
    <Grid container className={classes.root} justify="center">
      <Grid item xs={12}>
        <Typography variant="h4">Log In</Typography>
      </Grid>
      <Paper>
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
          <Grid item xs={12} className={classes.button}>
            <Button
              disabled={loading}
              variant="contained"
              color="primary"
              type="submit"
            >
              Log In
            </Button>
          </Grid>
        </form>
        <Grid item xs={12}>
          <Typography variant="body1">
            <Link to="/reset-password">Forgot Password?</Link>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            Need an account? <Link to="/signup">Sign up</Link>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
}
