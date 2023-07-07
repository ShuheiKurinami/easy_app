// src/models/UserModel.ts
import { getRepository } from "typeorm";
import { User } from "../entity/User";

export class UserModel {
    static async createUser(name: string) {
        const userRepository = getRepository(User);
        const user = userRepository.create({ name });
        const result = await userRepository.save(user);
        return result;
    }
    
    static async getAllUsers() {
            const userRepository = getRepository(User);
            const users = await userRepository.find();
            return users;
        }
}

