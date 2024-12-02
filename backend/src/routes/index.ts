import express  from "express";
import userRouter from "./user"
import ExamRouter from "./exam"

const router = express.Router();

router.use("/user", userRouter);
router.use("/exam", ExamRouter);

export default router
