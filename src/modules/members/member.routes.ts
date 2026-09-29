import { Router } from "express";
import { memberControllers } from "./member.controller";
import verifyRole from "../../middleware/verifyRole";

const router = Router();

router.get("/", verifyRole("librarian"), memberControllers.getAllUser);

router.put("/:memberId", verifyRole("librarian", 'member'), memberControllers.updateUser)

router.delete("/:memberId", verifyRole("librarian"), memberControllers.deleteUser)

export const membersRoute = router;