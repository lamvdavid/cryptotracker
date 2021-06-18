import { Card, Grid, IconButton, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import RefreshIcon from "@material-ui/icons/Refresh";
import React from "react";

export default function Crypto({ crypto, deleteClick, updateCrypto }) {
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
            {"$" + crypto.price}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <IconButton onClick={() => updateCrypto(crypto.symbol)}>
            <RefreshIcon color="action" />
          </IconButton>
        </Grid>
        <Grid item xs={6}>
          <IconButton onClick={() => deleteClick(crypto.symbol)}>
            <DeleteIcon color="secondary" />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  );
}
