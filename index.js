import express from "express";
import bodyParser from "body-parser";
import user from "./user/route.js";
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use("/user", user);

app.listen(port, () =>
  console.log(`Example backend API listening on port ${port}!`)
);
