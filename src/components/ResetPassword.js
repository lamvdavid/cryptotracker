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
import { Link } from "react-router-dom";
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
  message: {
    "& > *": {
      backgroundColor: "lightblue",
      color: "green",
      padding: "8px",
      margin: "8px",
    },
  },
}));

export default function ResetPassword() {
  const classes = useStyles();
  const { resetPassword } = useAuth();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await resetPassword(email);
      setMessage("Password Reset Email Sent");
    } catch {
      setError("Account does not exist");
    }
    setLoading(false);
  }

  return (
    <Grid container className={classes.root} justify="center">
      <Paper>
        <Grid item xs={12}>
          <Typography variant="h4">Reset Password</Typography>
        </Grid>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid item xs={12} className={classes.error}>
            {error && (
              <Card>
                <Typography className="error">{error}</Typography>
              </Card>
            )}
          </Grid>
          <Grid item xs={12} className={classes.message}>
            {message && (
              <Card>
                <Typography className="message">{message}</Typography>
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
          <Grid item xs={12} className={classes.button}>
            <Button
              disabled={loading}
              variant="contained"
              color="primary"
              type="submit"
            >
              Reset Password
            </Button>
          </Grid>
        </form>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            Need an account? <Link to="/signup">Sign up</Link>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
}
