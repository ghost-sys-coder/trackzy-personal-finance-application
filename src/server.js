import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

import transactionsRouter from "./routes/transactionRouter.js"

// run dotenv
dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

// middleware
app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// check api health
app.get("/", (req, res) => {
  res.status(200).send({ message: "API Working" });
})


app.use("/api/transactions/", transactionsRouter);


app.listen(PORT, () => {
  initDB().then(() => {
    console.log("Server running on port:", PORT);
  });
});


