import { Request, Response } from "express";
import { AppDataSource } from "../config/appDataSource";
import { User } from "../database/entities";
import { CustomErrors } from "../config/errors";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const httpProblem = require('httpproblem');

export class DefaultController {
    private userRepo = AppDataSource.getRepository(User);

    public async genToken(req: Request, res: Response): Promise<string> {
        return "Hello World";
    }

    public async signUp(req: Request, res: Response): Promise<User> {
        const user = new User();
        const { email, password } = req.body;

        user.email = email;
        user.password = password;

        const result = await this.userRepo.save(user);

        if (result) {
            return result;
        } else {
            throw new httpProblem.Document({
                type: CustomErrors.InternalServerError,
                title: 'User could not be created',
                status: 500
            });
        }
    }   
}

export const defaultController = new DefaultController();