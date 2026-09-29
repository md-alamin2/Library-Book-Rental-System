import express, { Request, Response } from "express";
import initDB from "./config/db";
import { userRoutes } from "./modules/auth/auth.routes";
const app = express();
const port = 5000;

// parser
app.use(express.json());



initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Library book rental system");
});

// user routes
app.use("/api/v1/auth", userRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
