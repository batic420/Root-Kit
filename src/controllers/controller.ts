import { AppDataSource } from "../config/appDataSource";
import { User } from "../database/entities";
import { CustomErrors } from "../config/errors";
import { PwValidator } from "../services/validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const httpProblem = require('httpproblem');

export class DefaultController {
    private userRepo = AppDataSource.getRepository(User);
    private jwtSecret = process.env.JWT_SECRET;
    private readonly jwtDur = process.env.JWT_DURATION;

    public async signUp(email: string, password: string): Promise<User> {
        
        if (!PwValidator.validatePw(password, email)) {
            throw new httpProblem.Document({
                type: CustomErrors.BadRequest,
                title: 'Password does not meet requirements',
                status: 400
            });
        }
        
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
    
    public async genToken(email: string, password: string): Promise<string> {
        const existingUser = await this.userRepo.findOne({
            where: { email: email }
        });

        if (!existingUser) {
            throw new httpProblem.Document({
                type: CustomErrors.NotFound,
                title: 'User not found',
                status: 404
            });
        }

        const comparison = bcrypt.compare(password, existingUser.password);
        const sec = this.jwtSecret as string;

        if (!comparison) {
            throw new httpProblem.Document({
                type: CustomErrors.Unauthorized,
                title: 'Incorrect password',
                status: 401
            });
        }

        const token = jwt.sign({ email: email }, sec, { expiresIn: this.jwtDur });
        console.log(token);

        return token;
    }
}

export const defaultController = new DefaultController();