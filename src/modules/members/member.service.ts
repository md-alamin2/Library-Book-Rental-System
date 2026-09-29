import { pool } from "../../config/db";

const getAllUser = async () => {
  const result = await pool.query(
    `SELECT id, name, email, role, phone FROM users`,
  );
  return result;
};

const updateUser = async (
  id: string,
  payload: Record<string, unknown>,
  currentUser: { id: number; role: string },
) => {
  const { name, email, role, phone } = payload;

  if (currentUser.role !== "librarian" && currentUser.id !== parseInt(id)) {
    throw new Error("You are not allowed to update this user");
  }

  if (currentUser.role !== "librarian") {
    delete payload.role;
  }

  const result = await pool.query(
    `UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING id, name, email, phone, role`,
    [name, email, phone, role, id],
  );

  return result;
};

const deleteUser = async(id: string)=>{
    // check active loan
    const checkActiveLoan = await pool.query(`SELECT id FROM loans WHERE member_id =$1 AND status='active'`, [id]);

    if(checkActiveLoan.rows.length > 0){
        throw new Error("Can not delete user with active loan")
    }

    const result = await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
    return result

}

export const memberServices = {
  getAllUser,
  updateUser,
  deleteUser
};
