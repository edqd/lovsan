import { getMarketData } from "server/adapters/market";

export const getTodayRates = async () => {
  const { rates } = await getMarketData();

  return rates;
};
