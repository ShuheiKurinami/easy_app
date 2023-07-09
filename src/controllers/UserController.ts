import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import { Task } from "../entity/User";
import { getRepository } from "typeorm";

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
        const tasks = await UserModel.getAllUsers();
        res.send(tasks);
    }

    static async getAllUsers_All(req: Request, res: Response) {
        const tasks = await UserModel.getAllUsers();
        res.render('users_all', { tasks: tasks });
    }

    static async deleteUser(req: Request, res: Response) {
        const userRepository = getRepository(Task);
        const id = req.body.id; // idはPOSTリクエストのボディから取得

        try {
            const userToRemove = await userRepository.findOne(id);

            if (!userToRemove) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            await userRepository.remove(userToRemove);
            res.status(200).json({ message: "User deleted" });
        } catch (error) {
            res.status(500).json({ message: error.toString() });
        }
    }
}