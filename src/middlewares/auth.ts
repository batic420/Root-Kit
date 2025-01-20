import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const httpProblem = require('httpproblem');

export const authToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    const sec = process.env.JWT_SECRET as string;

    if (!token) {
        throw new httpProblem.Document({
            type: 'Unauthorized',
            title: 'Access denied. No token provided.',
            status: 401
        });
    }

    try {
        const decoded = jwt.verify(token, sec);
        req.user = decoded;
        next();
    } catch (err) {
        throw new httpProblem.Document({
            type: 'Unauthorized',
            title: 'Invalid token.',
            status: 401
        });
    }
}