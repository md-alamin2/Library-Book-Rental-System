import { Request, Response } from "express";
import { memberServices } from "./member.service";

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await memberServices.getAllUser();
    res.status(200).json({
      success: true,
      message: "Members get successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  // const id = req.params.memberId;
  const { id, role } = req.user as { id: number; role: string };
  try {
    const result = await memberServices.updateUser(
      req.params.memberId as string,
      req.body,
      { id, role },
    );

    res.status(200).json({
      success: true,
      message: "Information updated successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.memberId;
  try {
    const result = await memberServices.deleteUser(id as string);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const memberControllers = {
  getAllUser,
  updateUser,
  deleteUser
};
