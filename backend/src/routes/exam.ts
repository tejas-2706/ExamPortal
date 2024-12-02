import express  from "express";
import { authMiddleware } from "../middleware";
const router = express.Router();


router.get('/', authMiddleware,(req,res) => {
    res.json({
        message: "You are Verified User !!"
    })
})


export default router