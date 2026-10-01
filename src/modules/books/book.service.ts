import { pool } from "../../config/db";

const addBooks = async (payload: Record<string, unknown>) => {
  const { title, author, isbn, category, total_copies, available_copies } =
    payload;

  const result = await pool.query(
    `INSERT INTO books(title, author, isbn, category, total_copies, available_copies) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
    [title, author, isbn, category, total_copies, available_copies],
  );

  return result;
};

const getAllBooks = async (category?: string | unknown) => {
  if (!category) {
    const result = await pool.query(`SELECT * FROM books`);
    return result;
  } else {
    const result = await pool.query(`SELECT * FROM books WHERE category=$1`, [
      category,
    ]);
    return result;
  }
};

const getSingleBook = async (id: string) => {
  const result = await pool.query(`SELECT * FROM books WHERE id = $1`, [id]);

  return result;
};

const updateBook = async (payload: Record<string, unknown>, id: string) => {
  const { title, author, isbn, category, total_copies, available_copies } =
    payload;

  const result = await pool.query(
    `UPDATE books SET title=$1, author=$2, isbn=$3, category=$4, total_copies=$5, available_copies=$6 WHERE id=$7 RETURNING *`,
    [title, author, isbn, category, total_copies, available_copies, id],
  );

  return result;
};

const deleteBook = async (id: string) => {
  const checkActiveLoan = await pool.query(
    `SELECT id FROM loans WHERE book_id =$1 AND status='active'`,
    [id],
  );

  if (checkActiveLoan.rows.length > 0) {
    throw new Error("Can not delete book with active loan");
  }

  const result = await pool.query(`DELETE FROM books WHERE id=$1`, [id]);

  return result;
};

export const bookServices = {
  addBooks,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
