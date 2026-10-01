import { Router } from "express";
import { loanControllers } from "./loan.controller";
import verifyRole from "../../middleware/verifyRole";

const router = Router()

router.post("/",verifyRole("librarian", "member"), loanControllers.createLoan)

router.get("/", verifyRole("librarian", "member"), loanControllers.getLoan)

router.put("/:loanId", verifyRole("librarian", "member"), loanControllers.updateLoan)


export const loanRoutes = router;