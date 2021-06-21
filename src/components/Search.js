import {
  Button,
  Card,
  Grid,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { React, useState } from "react";
import axios from "axios";
import { coinapi_uri, restAPI_uri } from "./Home";
import { useAuth } from "../context/AuthProvider";
import SearchResult from "./SearchResult";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Search({ setCryptos, cryptos }) {
  const classes = useStyles();
  const { user } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const [coinInfo, setCoinInfo] = useState();

  //Send GET request to CoinAPI
  const searchClick = () => {
    if (searchInput) {
      axios
        .get(coinapi_uri + searchInput)
        .then((res) => {
          console.log();
          if (res.data.length) {
            setCoinInfo(...res.data);
          } else {
            setCoinInfo({
              symbol: "No coin found",
              price: "Check if symbol input correctly",
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  //Send POST request to MongoDB
  const addClick = () => {
    if (searchInput) {
      axios
        .get(coinapi_uri + searchInput)
        .then((res) => {
          if (res.data.length) {
            setCoinInfo(...res.data);
            axios
              .post(restAPI_uri + "/users/" + user.email + "/add-crypto", {
                symbol: res.data[0].id,
              })
              .then(() => {
                if (
                  !cryptos.some((coin) => coin.symbol === res.data[0].symbol)
                ) {
                  setCryptos([
                    ...cryptos,
                    { symbol: res.data[0].symbol, price: res.data[0].price },
                  ]);
                  console.log("Added " + searchInput);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            setCoinInfo({
              symbol: "No coin found",
              price: "Check if symbol input correctly",
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  //Only allow A-z in the search input
  const handleChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^A-Za-z]/gi, "");
    setSearchInput(value.toUpperCase());
  };

  return (
    <Grid container className="search" justify="center" alignItems="center">
      <Grid item xs={12}>
        <TextField
          id="symbol-input"
          value={searchInput}
          placeholder="BTC"
          variant="outlined"
          helperText="Use Crypto Symbol"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleChange}
        />
        <div className={classes.root}>
          <Button variant="contained" color="primary" onClick={searchClick}>
            Search
          </Button>
          <Button variant="contained" color="primary" onClick={addClick}>
            Add
          </Button>
        </div>
      </Grid>
      <Grid item xs={12}>
        {coinInfo && <SearchResult crypto={coinInfo}></SearchResult>}
      </Grid>
    </Grid>
  );
}
