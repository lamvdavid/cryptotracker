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
}));

export default function Account() {
  const classes = useStyles();
  const { updatePassword } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [pass, setPass] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await updatePassword(pass);
    } catch {
      setError("Failed to update password");
    }
    setLoading(false);
  }

  return (
    <Grid container className={classes.root} justify="center">
      <Grid item xs={12}>
        <Typography variant="h4">Update Password</Typography>
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
              Update Password
            </Button>
          </Grid>
        </form>
        <Grid item xs={12}>
          <Typography variant="body1">
            <Link to="/">Return Home</Link>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
}
