import React from "react";
import Search from "./Search";
import Cryptos from "./Cryptos";
import axios from "axios";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";

export const coinapi_key = process.env.REACT_APP_COINAPI_KEY;
export const coinapi_uri =
  "https://api.nomics.com/v1/currencies/ticker?key=" + coinapi_key + "&ids=";
export const restAPI_uri = process.env.REACT_APP_RESTAPI_URI;

export default function Home() {
  const { user } = useAuth();

  const [cryptos, setCryptos] = useState([]);

  function getCryptos() {
    if (user) {
      axios.get(restAPI_uri + "/users/" + user.email).then((res) => {
        //Get coins from database using logged in user
        let coins = "";
        res.data[0]["cryptos"].map((coin) => {
          return (coins += coin + ",");
        });

        //Populate starting coins if no coins were returned from database
        if (!res.data[0]["cryptos"].length) {
          coins += "BTC,ETH,ADA,MATIC,DOGE,ALGO";
        }

        //Query coinapi for coin information
        updateCryptos(coins);
      });
    } else {
      //Default starting coins to show crypto grid
      let coins = "BTC,ETH,ADA,MATIC,DOGE,ALGO";

      //Query coinapi for coin information
      updateCryptos(coins);
    }
  }

  function updateCryptos(coins) {
    if (coins) {
      axios.get(coinapi_uri + coins).then((coins) => {
        setCryptos([
          ...coins.data.sort((a, b) => {
            return a.symbol > b.symbol ? 1 : -1; //Sort coins alphabetically
          }),
        ]);
      });
    }
  }

  function updateCrypto(coin) {
    axios.get(coinapi_uri + coin).then((coin) => {
      setCryptos([
        ...cryptos.map((crypto) => {
          return crypto.symbol === coin.data[0].symbol ? coin.data[0] : crypto;
        }),
      ]);
    });
  }

  //Load Initial Crypto Coins
  useEffect(() => {
    getCryptos();
  }, []);

  return (
    <>
      <Search setCryptos={setCryptos} cryptos={cryptos} />
      <Cryptos
        cryptos={cryptos}
        setCryptos={setCryptos}
        updateCrypto={updateCrypto}
        updateCryptos={updateCryptos}
      />
    </>
  );
}
