import { Router } from "express";
import { getTodayRates } from "server/cases/rates";

export const restApiAdapter = Router();

restApiAdapter.get("/rates", async (req, res) => {
  const rates = await getTodayRates();
  res.json({ rates });
});
