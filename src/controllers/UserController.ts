import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import { User } from "../entity/User";

export class UserController {
    static async createUser(req: Request, res: Response) {
        try {
            const { name } = req.body;
            const user = await UserModel.createUser(name);
            res.status(201).json(user);
        } catch (error) {
            //res.status(500).json({ message: error.message });
        }
    }

    static async getAllUsers(req: Request, res: Response) {
        const users = await UserModel.getAllUsers();
        res.send(users);
    }

    static async getAllUsers_All(req: Request, res: Response) {
        const users = await UserModel.getAllUsers();
        res.render('users_all', { users: users });
    }
}