import { Request, Response } from "express";
import { loanServices } from "./loan.service";
import { JwtPayload } from "jsonwebtoken";

const createLoan = async(req: Request, res: Response)=>{
    try {
       const result = await loanServices.createLoan(req.body);
       
       res.status(201).json({
        success: true,
        message: "Loan started successfully",
        data: result.rows[0]
       })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const getLoan = async(req: Request, res: Response)=>{
    try {
        const result = await loanServices.getLoan(req.user as JwtPayload);
        res.status(200).json({
            success: true,
            message: "Loan get successfully",
            data: result.rows
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const loanControllers = {
    createLoan,
    getLoan
}