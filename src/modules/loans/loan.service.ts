import { JwtPayload } from "jsonwebtoken";
import { pool } from "../../config/db";

const createLoan = async (payload: Record<string, unknown>) => {
  const { member_id, book_id } = payload;

  const checkAvailableCopies = await pool.query(
    `SELECT * FROM books WHERE id=$1`,
    [book_id],
  );

  if (checkAvailableCopies.rows.length === 0) {
    throw new Error("There is no available book with this id");
  }

  if (checkAvailableCopies.rows[0].available_copies === 0) {
    throw new Error("Book do not have available copies");
  }

  const result = await pool.query(
    `INSERT INTO loans(member_id, book_id, borrow_date, due_date, status) VALUES($1, $2, CURRENT_DATE, CURRENT_DATE + 14, 'active') RETURNING *`,
    [member_id, book_id],
  );

  //   decrease available book copies
  await pool.query(
    `UPDATE books SET available_copies = available_copies - 1 WHERE id = $1`,
    [book_id],
  );

  return result;
};

const getLoan = async (payload: JwtPayload) => {
  const { id, role } = payload;

  if (role === "member") {
    const result = await pool.query(`SELECT * FROM loans WHERE member_id=$1`, [id]);
    return result;
  } else {
    const result = await pool.query(`select * FROM loans`);
    return result;
  }
};

export const loanServices = {
  createLoan,
  getLoan,
};
