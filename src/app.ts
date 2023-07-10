// src/index.ts
import express from "express";
import { createConnection } from "typeorm";
import { Task } from "./entity/User";
import { UserController } from "./controllers/UserController";
import appRoot from "app-root-path";

import helmet from 'helmet';
import cors from 'cors';

import sqlite3 from 'sqlite3';

const app = express();

app.use(helmet());
app.use(cors());
const bodyParser = require('body-parser');

//body-parserの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // to support URL-encoded bodies

const router = require('./routes/');
app.use('/', router)

/* app.use(express.static('public'));  // to serve static files
app.get("/user", UserController.getAllUsers);
app.get("/users_all", UserController.getAllUsers_All);
app.set('view engine', 'ejs');
app.set("views", appRoot.resolve("src/views"));
app.post("/delete", UserController.deleteUser);
*/
app.get('/helloWorld', (req, res) => {
    res.status(200).send({ message: 'hello, world' });
});

let db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
      console.error(err.message);
      process.exit(-1);
    }
    console.log('Connected to the SQlite database.');
  });


createConnection({
    type: "sqlite",
    database: "database.sqlite",
    entities: [Task],
    synchronize: true,
}).then(() => {
    app.post("/users", UserController.createUser);
    app.listen(3000, () => {
        console.log("Server started on port 3000");
    });
}).catch((error) => console.log(error));
