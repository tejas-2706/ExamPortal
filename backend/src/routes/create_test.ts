// import express  from "express";
// import { authMiddleware } from "../middleware";
// const router = express.Router();


// router.get('/', authMiddleware,(req,res) => {
//     res.json({
//         message: "You are Verified User !!"
//     })
// })


// export default router


import express from "express";
import { authMiddleware } from "../middleware"; // Authentication middleware
import { PrismaClient } from "@prisma/client"; // Prisma Client to interact with the database

const router = express.Router();
const prisma = new PrismaClient();

// Route to create a test (only accessible by authenticated users with 'teacher' role)
router.post('/new-test', authMiddleware, async (req:any, res:any) => {
    try {
        // Check if the user is a teacher (since only teachers can create tests)
        // The userId is set by the authMiddleware after JWT verification
        const userId = req.userId;

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user || user.role !== "Teacher") {
            return res.status(403).json({
                message: "Only teachers can create tests",
            });
        }

        // Extract test data from the request body
        const { testName, questions, maxMarks } = req.body;

        // Create a new test associated with the teacher
        const newTest = await prisma.test.create({
            data: {
                testName,
                teacherId: userId, // Set the teacherId to the logged-in user
                questions, // Assuming the questions are passed as JSON
                maxMarks,
            },
        });

        // Send success response with the created test
        return res.status(201).json({
            message: "Test created successfully!",
            test: newTest,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to create test. Please try again.",
        });
    }
});

// A route to verify authentication (for testing purposes)
router.get('/', authMiddleware, (req, res) => {
    res.json({
        message: "You are a verified user!!",
    });
});

export default router;

