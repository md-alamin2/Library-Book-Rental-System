import { Router } from "express";
import { loanControllers } from "./loan.controller";
import verifyRole from "../../middleware/verifyRole";

const router = Router()

router.post("/",verifyRole("librarian", "member"), loanControllers.createLoan)


export const loanRoutes = router;