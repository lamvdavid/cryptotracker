import dotenv from "dotenv";

dotenv.config({ path: "../.env.local" });

export const db =
  "mongodb+srv://" +
  process.env.MONGODB_USER +
  ":" +
  process.env.MONGODB_PASS +
  "@cryptotracker.6xcef.mongodb.net/+" +
  process.env.MONGODB_DB +
  "?retryWrites=true&w=majority";
