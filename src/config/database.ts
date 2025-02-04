import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const defaultConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
};

export class DbConfig {
    private connection: mysql.Connection | null = null;

    public async init(): Promise<mysql.Connection> {
        try {
            this.connection = await mysql.createConnection(defaultConfig);
        
        await this.connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
        await this.connection.query(`USE ${process.env.DB_NAME}`);
        await this.connection.query(`CREATE TABLE IF NOT EXISTS user (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('Database initialized');
        return this.connection;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

export const dbConfig = new DbConfig();