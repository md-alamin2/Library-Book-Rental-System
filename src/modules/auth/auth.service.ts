import bcrypt from "bcryptjs";
import { pool } from "../../config/db";
import config from "../../config";
import jwt from "jsonwebtoken";

const createUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, role, phone } = payload;

  const hashedPass = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `INSERT INTO users(name, email, password, role, phone) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [name, email, hashedPass, role, phone],
  );

  return result;
};

const loginUser = async (email: string, password: string) => {
  const checkUserExists = await pool.query(
    `SELECT * FROM users WHERE email=$1`,
    [email],
  );

  if (checkUserExists.rows.length === 0) {
    return null;
  }

  const user = checkUserExists.rows[0];

  const passwordMatched = await bcrypt.compare(password, user.password);

  if (!passwordMatched) {
    return null;
  }

  const secret = config.secret_str as string;

  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    secret,
    {
      expiresIn: "7d",
    },
  );

  const { password: pass, ...userWithoutPass } = user;

  return { token, userWithoutPass };
};

export const authServices = {
  createUser,
  loginUser,
};
