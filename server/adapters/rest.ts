import { Router } from "express";
import { getTodayRates } from "server/cases/rates";
import { MarketTicket } from "server/entities/types";

export const restApiAdapter = Router();

export interface RatesResponse {
  rates: MarketTicket["rates"];
}

restApiAdapter.get("/rates", async (req, res) => {
  const rates = await getTodayRates();
  const response: RatesResponse = { rates };
  res.json(response);
});
