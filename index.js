import express from "express";
import bodyParser from "body-parser";
import { createConnection } from "./model/dbConn.js";
import user from "./route/user.js";
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use("/user", user);

//connection of dbs
createConnection();

app.listen(port, () =>
  console.log(`Example backend API listening on port ${port}!`)
);
