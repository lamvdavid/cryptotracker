import express from "express";
export const cryptoRoute = express.Router();

import { cryptoModel } from "../models/Users.js";

cryptoRoute.route("/users/:user").get((req, res) => {
  cryptoModel.find({ user: req.params.user }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

cryptoRoute.route("/users/create").post((req, res, next) => {
  cryptoModel.create(req.body, (err, data) => {
    if (err) {
      return next(err);
    } else {
      res.json(data);
    }
  });
});

cryptoRoute.route("/users/:user/add-crypto").post((req, res, next) => {
  cryptoModel.findOneAndUpdate(
    { user: req.params.user },
    { $addToSet: { cryptos: req.body.symbol } },
    (err, data) => {
      if (err) {
        return next(err);
      } else {
        res.json(data);
      }
    }
  );
});

cryptoRoute
  .route("/users/:user/delete-crypto/:symbol")
  .delete((req, res, next) => {
    cryptoModel.findOneAndUpdate(
      { user: req.params.user },
      { $pull: { cryptos: req.params.symbol } },
      (err, data) => {
        if (err) {
          return next(err);
        } else {
          res.json(data);
        }
      }
    );
  });
