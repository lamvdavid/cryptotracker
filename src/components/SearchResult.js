import { Card, Grid, Typography } from "@material-ui/core";
import React from "react";

export default function Crypto({ crypto }) {
  let price = crypto.price;

  if (!price.startsWith("C")) {
    price = "$" + price;
  }

  return (
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
      </Grid>
    </Card>
  );
}
