import jwt, { Algorithm } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { CustomErrors } from '../config/errors';

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const httpProblem = require('httpproblem');

export class AuthService {
    private readonly JWT_SECRET = process.env.JWT_SECRET as string;
    private readonly OPTIONS = {
        expiresIn: process.env.JWT_DURATION,
        algorithm: 'RS256' as Algorithm
    };

    public async genToken(mail: string): Promise<string> {
        const PAYLOAD = mail;
        const token = jwt.sign(PAYLOAD, this.JWT_SECRET, this.OPTIONS);

        return token;
    }
    
    public async verifyToken(token: string): Promise<string | object> {
        try {
            const decoded = jwt.verify(token, this.JWT_SECRET);
            return decoded;
        } catch (err) {
            throw new httpProblem.Document({
                type: CustomErrors.Forbidden,
                title: 'Invalid token',
                status: 403
            })
        }
    }
}