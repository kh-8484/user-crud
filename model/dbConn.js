import mongoose from "mongoose";
export let database;

export const createConnection = () => {
  if (database) {
    return;
  }
  mongoose.connect("mongodb://localhost:27017/user-db");
  database = mongoose.connection;
  database.once("open", async () => {
    console.log("Connected to database");
  });
  database.on("error", () => {
    console.log("ALERT => Error connecting to database");
  });
};
