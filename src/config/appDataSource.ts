import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../database/entities';
import { parse } from 'path';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: true,
    logging: true,
    entities: [
        User
    ],
    extra: {
        connectionLimit: 10
    }
});