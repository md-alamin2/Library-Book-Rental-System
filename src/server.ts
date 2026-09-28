import express, { Request, Response } from "express";
import { Pool } from "pg";
import config from "./config";
const app = express();
const port = 5000;

// parser
app.use(express.json());

const pool = new Pool({
  connectionString: `${config.connection_str}`,
});

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone VARCHAR(15) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('librarian', 'member'))
    )`);
};

initDB()

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
