import { Request, Response } from "express";
import { loanServices } from "./loan.service";

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

export const loanControllers = {
    createLoan,
}