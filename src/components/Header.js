import {
  Button,
  Grid,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "white",
  },
}));

export default function Header() {
  const classes = useStyles();
  const { user, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => setAnchorEl(null);

  async function handleLogout() {
    handleClose();
    await logout();
  }

  return (
    <Grid container className="App-header">
      <Grid item xs={12}>
        <Typography variant="h3" component={Link} to="/">
          Crypto Tracker
        </Typography>
      </Grid>

      <Grid item>
        {!user && <Link to="/login">Log in</Link>}
        {user && (
          <div>
            <Button
              onClick={(e) => setAnchorEl(e.currentTarget)}
              className={classes.button}
              startIcon={<AccountCircleIcon />}
            >
              {user.email}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              keepMounted
            >
              <MenuItem component={Link} to={"/account"} onClick={handleClose}>
                Account Details
              </MenuItem>
              <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </Menu>
          </div>
        )}
      </Grid>
    </Grid>
  );
}
