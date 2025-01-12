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

    public async signUp(email: string, password: string): Promise<User> {
        const user = new User();

        user.email = email;
        user.password = password;

        const result = await this.userRepo.save(user);
        console.log(result);

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