import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../database/entities';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [
        User
    ],
})