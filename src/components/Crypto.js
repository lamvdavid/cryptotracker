import {
  Card,
  Grid,
  IconButton,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import DeleteIcon from "@material-ui/icons/Delete";
import RefreshIcon from "@material-ui/icons/Refresh";
import InfoIcon from "@material-ui/icons/Info";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 280,
    padding: 12,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    backgroundColor: "#04395e",
    color: "white",
    border: "4px solid #947bd3",
  },
  logo: {
    maxWidth: "100%",
    maxHeight: 125,
    height: "auto",
    margin: "8px",
  },
}));

export default function Crypto({
  crypto,
  deleteClick,
  updateCrypto,
  isSearch,
}) {
  const classes = useStyles();

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function formatDate(date) {
    let year = date.substring(0, 4);
    let month = date.substring(5, 7);
    let day = date.substring(8, 10);

    return month + "/" + day + "/" + year;
  }

  let price = crypto.price;

  if (!price.startsWith("C")) {
    price = "$" + price;
  }

  let cryptoModal = <></>;

  if (!crypto.price.startsWith("C")) {
    cryptoModal = (
      <Card className={classes.modal}>
        <Grid container justify="center" alignItems="center" spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h3">{crypto.symbol}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4">{crypto.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <img
              src={crypto.logo_url}
              className={classes.logo}
              alt={crypto.symbol + " logo"}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">{"Current: $" + crypto.price}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">
              {"All Time High: $" + crypto.high}
            </Typography>
            <Typography variant="subtitle1">
              {formatDate(crypto.high_timestamp)}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    );
  }

  let buttons;

  if (isSearch) {
    if (!crypto.price.startsWith("C")) {
      buttons = (
        <Grid item xs={12}>
          <IconButton onClick={openModal}>
            <InfoIcon style={{ color: "white" }} />
          </IconButton>
        </Grid>
      );
    }
  } else {
    buttons = (
      <>
        <Grid item xs={4}>
          <IconButton onClick={() => updateCrypto(crypto.symbol)}>
            <RefreshIcon color="primary" />
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <IconButton onClick={openModal}>
            <InfoIcon style={{ color: "white" }} />
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <IconButton onClick={() => deleteClick(crypto.symbol)}>
            <DeleteIcon color="secondary" />
          </IconButton>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Card key={crypto.id}>
        <Grid
          container
          spacing={1}
          justify="flex-end"
          alignItems="flex-end"
          className="crypto-card"
        >
          <Grid item xs={12}>
            <Typography variant="h4" className="crypto-symbol">
              {crypto.symbol}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" className="crypto-price">
              {price}
            </Typography>
          </Grid>
          {buttons}
        </Grid>
      </Card>

      <Modal open={modalIsOpen} onClose={closeModal}>
        {cryptoModal}
      </Modal>
    </>
  );
}
