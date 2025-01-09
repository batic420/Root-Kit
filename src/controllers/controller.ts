import { Request, Response } from "express";
import { AppDataSource } from "../config/appDataSource";
import { User } from "../database/entities";

export class DefaultController {
    private userRepo = AppDataSource.getRepository(User);

    public async genToken(req: Request, res: Response): Promise<string> {
        return "Hello World";
    }

    public async signUp(req: Request, res: Response): Promise<void> {
        const user = new User();
        const { email, password } = req.body;

        user.email = email;
        user.password = password;

        const result = await this.userRepo.save(user);
    }   
}