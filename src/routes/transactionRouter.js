import { Router } from "express";
import { createTransaction, deleteTransactionById, getTransactionsByUserId, getTransactionsSummaryByUserId } from "../controllers/transactionControllers.js";

const router = Router();




router.get("/:userId", getTransactionsByUserId);

router.delete("/:id", deleteTransactionById);


router.get("/summary/:userId", getTransactionsSummaryByUserId)

router.post("/", createTransaction);




export default router;