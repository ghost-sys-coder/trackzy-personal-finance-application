import { initDB, sql } from "../config/db.js";

export const getTransactionsByUserId = async (req, res) => {


  try {
    const { userId } = req.params;
    const transactions = await sql`
        SELECT * FROM transactions 
        WHERE user_id = ${userId}
        ORDER BY created_at DESC
      `;
    return res.status(200).json(transactions);
  } catch (error) {
    console.log("Error Fetching user transactions", error);
    return res.send(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTransactionById = async (req, res) => {

  try {
    const { id } = req.params;

    // check if the id is a number
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ message: "Invalid transaction id" });
    }

    const result = await sql`
            DELETE FROM transactions
            WHERE id = ${id} RETURNING *
        `;

    if (result.length === 0) {
      return res.status(404).json({ message: "Transaction not found!" });
    }

    return res
      .status(201)
      .json({ message: "Transaction deleted successfully!" });
  } catch (error) {
    console.log("Error deleting transaction", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTransactionsSummaryByUserId = async (req, res) => {

  try {
    const { userId } = req.params;

    const balanceResult = await sql`
            SELECT 
                COALESCE(SUM(amount), 0) AS balance 
            FROM transactions 
            WHERE user_id = ${userId}
        `;

    const incomeResult = await sql`
            SELECT
                COALESCE(SUM(amount), 0) AS income
            FROM transactions
            WHERE user_id = ${userId} AND amount > 0
        `;

    const expensesResult = await sql`
            SELECT
                COALESCE(SUM(amount), 0) AS expenses
            FROM transactions
            WHERE user_id = ${userId} AND amount < 0
        `;

    return res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expenses: expensesResult[0].expenses,
    });
  } catch (error) {
    console.log("Failed to fetch summary", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createTransaction = async (req, res) => {

  try {
    const { user_id, title, amount, category } = await req.body;

    if (!user_id || !title || !category || amount === undefined) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const transaction = await sql`
            INSERT INTO transactions(user_id, title, amount, category)
            VALUES(${user_id}, ${title}, ${amount}, ${category})
            RETURNING *
        `;

    console.log(transaction[0]);
    res.status(201).json({
      message: "Transaction successfully created!",
      success: true,
      transaction: transaction[0],
    });
  } catch (error) {
    console.log("Failed to create transaction:", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
