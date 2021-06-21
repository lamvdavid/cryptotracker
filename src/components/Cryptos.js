import { Grid } from "@material-ui/core";
import axios from "axios";
import React from "react";
import Crypto from "./Crypto";
import { restAPI_uri } from "./Home";
import { useAuth } from "../context/AuthProvider";
import { TextField, IconButton } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import { useState } from "react";

export default function Cryptos({
  cryptos,
  setCryptos,
  updateCrypto,
  updateCryptos,
}) {
  const { user } = useAuth();

  const [filter, setFilter] = useState("");

  const deleteClick = (coin) => {
    axios
      .delete(restAPI_uri + "/users/" + user.email + "/delete-crypto/" + coin)
      .then(() => {
        const newCryptos = cryptos.filter((crypto) => crypto.symbol !== coin);
        setCryptos([...newCryptos]);
      });
  };

  function getCoins() {
    let coins = "";
    cryptos.map((coin) => (coins += coin.symbol + ","));
    return coins;
  }

  const handleChange = (e) => setFilter(e.target.value.toUpperCase());

  return (
    <Grid
      container
      className="cryptos"
      key="cryptos"
      justify="center"
      alignContent="center"
    >
      <Grid item key="cryptos-filter" xs={12}>
        <TextField
          value={filter}
          onChange={handleChange}
          label="Filter by symbol"
        ></TextField>
        <IconButton onClick={() => updateCryptos(getCoins())}>
          <RefreshIcon />
        </IconButton>
      </Grid>
      {cryptos
        .filter((coin) => coin.symbol.includes(filter))
        .map((crypto) => {
          return (
            <Grid item key={crypto.symbol} xs={12} md={4} className="crypto">
              <Crypto
                item
                crypto={crypto}
                deleteClick={deleteClick}
                updateCrypto={updateCrypto}
                isSearch={false}
              />
            </Grid>
          );
        })}
    </Grid>
  );
}
