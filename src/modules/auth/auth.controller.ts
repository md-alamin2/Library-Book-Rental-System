import { Request, Response } from "express";
import { authServices } from "./auth.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.createUser(req.body);

    res.status(201).json({
      success: true,
      message: "User created Successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authServices.loginUser(email, password);
    if (!result) {
      return res.status(401).json({
        success: false,
        message: "invalid email or password",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User login successfully",
        data: result,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const authControllers = {
  createUser,
  loginUser,
};
