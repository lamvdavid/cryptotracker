import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      unique: true,
      index: true,
      required: true,
    },
    cryptos: [String],
  },
  {
    collection: "users",
  }
);
export const cryptoModel = mongoose.model("Users", cryptoSchema);
