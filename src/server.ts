import express, { Request, Response } from "express";
import initDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
import { membersRoute } from "./modules/members/member.routes";
const app = express();
const port = 5000;

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
