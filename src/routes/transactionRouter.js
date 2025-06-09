import { Router } from "express";
import { createTransaction, deleteTransactionById, getTransactionsByUserId } from "../controllers/transactionControllers.js";

const router = Router();




router.get("/:userId", getTransactionsByUserId);

router.delete("/:id", deleteTransactionById);


router.get("/summary/:userId", getTransactionsByUserId)

router.post("/", createTransaction);




export default router;