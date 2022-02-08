import { Router } from "express";
import { getTodayRates } from "../cases/rates";
import { MarketTicket } from "../entities/types";
import { middleware as cache } from "apicache";

export const restApiAdapter = Router();

export interface RatesResponse {
  rates: MarketTicket["rates"];
}

/**
 * cnb cache control states expires=86400, but expires is set to 5 minutes..
 */
restApiAdapter.get("/rates", cache("5 minutes"), async (req, res) => {
  const rates = await getTodayRates();
  const response: RatesResponse = { rates };
  res.json(response);
});
