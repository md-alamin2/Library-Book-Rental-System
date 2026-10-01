import express, { Request, Response } from "express";
import initDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
import { membersRoute } from "./modules/members/member.routes";
import { booksRoutes } from "./modules/books/book.routes";
import { loanRoutes } from "./modules/loans/loan.routes";
import config from "./config";
const app = express();
const port = config.port;

// parser
app.use(express.json());



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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
