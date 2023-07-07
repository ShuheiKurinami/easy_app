// src/index.ts
import express from "express";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { UserController } from "./controllers/UserController";
import appRoot from "app-root-path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // to support URL-encoded bodies
app.use(express.static('public'));  // to serve static files
app.get("/user", UserController.getAllUsers);
app.get("/users_all", UserController.getAllUsers_All);
app.set('view engine', 'ejs');
app.set("views", appRoot.resolve("src/views"));

createConnection({
    type: "sqlite",
    database: "database.sqlite",
    entities: [User],
    synchronize: true,
}).then(() => {
    app.post("/users", UserController.createUser);
    app.listen(3000, () => {
        console.log("Server started on port 3000");
    });
}).catch((error) => console.log(error));
