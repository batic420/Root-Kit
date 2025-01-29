import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { CustomErrors } from '../config/errors';
import { JwtPayload } from 'jsonwebtoken';

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const httpProblem = require('httpproblem');

export const authToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    const sec = process.env.JWT_SECRET as string;

    if (!token) {
        throw new httpProblem.Document({
            type: CustomErrors.Unauthorized,
            title: 'Access denied. No token provided.',
            status: 401
        });
    }

    try {
        const decoded = jwt.verify(token, sec) as JwtPayload;
        req.user = decoded;
        next();
    } catch (err) {
        throw new httpProblem.Document({
            type: CustomErrors.Unauthorized,
            title: 'Invalid token.',
            status: 401
        });
    }
}

console.log('auth.ts loaded');