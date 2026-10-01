import express, { Request, Response } from "express";
import initDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
import { membersRoute } from "./modules/members/member.routes";
import { booksRoutes } from "./modules/books/book.routes";
import { loanRoutes } from "./modules/loans/loan.routes";
const app = express();


// middleware
app.use(express.json());


// initialize db
initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Library book rental system");
});

// auth routes
app.use("/api/v1/auth", authRoutes)

// member routes
app.use("/api/v1/members", membersRoute)

// books routes
app.use("/api/v1/books", booksRoutes)

// loan routes
app.use("/api/v1/loans", loanRoutes)

app.use((req, res)=>{
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
    errors: "API endpoint not found"
  })
})

export default app