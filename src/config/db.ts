import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
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

  await pool.query(`
    CREATE TABLE IF NOT EXISTS books(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    category VARCHAR(20) NOT NULL CHECK(category IN ('fiction', 'non-fiction', 'reference', 'children')),
    total_copies INT NOT NULL CHECK(total_copies > 0),
    available_copies INT NOT NULL CHECK(available_copies >= 0 AND available_copies<= total_copies)
    )`);

  await pool.query(`
      CREATE TABLE IF NOT EXISTS loans(
      id SERIAL PRIMARY KEY,
      member_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      book_id INT NOT NULL REFERENCES books(id) ON DELETE CASCADE,
      borrow_date DATE NOT NULL,
      due_date DATE NOT NULL,
      return_date DATE,
      fine_amount NUMERIC(10, 2) DEFAULT 0 CHECK (fine_amount>=0),
      status VARCHAR(30) NOT NULL CHECK(status IN ('active', 'returned', 'overdue')),
      CHECK (due_date = borrow_date + INTERVAL '14 days')
      )
      `);
};


export default initDB