import { MarketTicket } from "../entities/types";
import cnb from "../infra/cnb";

/**
 * not used in the end, idea was to handle cases where cols would be rearanged
 * but docs state its static so this would get purged
 */
const dict: Record<string, string> = {
  země: "country",
  měna: "currency",
  množství: "base",
  kód: "code",
  kurz: "rate",
};

/**
 * since nobody wanted historical data, we'll be concerning with present values only
 * and disregard other column formats
 * @param str data from cnb
 */
export const parseMarketTicket = (str: string): MarketTicket => {
  // get lines and remove empty ones
  const [identifier, header, ...data] = str.split("\n").filter(l => l);
  const [stamp, counter] = identifier.split(" ");
  const [day, month, year] = stamp.split(".").map((v) => parseInt(v));
  const createdAt = new Date(year, month - 1, day);
  const yearIndex = counter.startsWith("#") ? counter.slice(1) : counter;
  const rates: MarketTicket["rates"] = data.map((line) => {
    const [country, currency, base, code, rate] = line.split("|").map(v => v.trim());
    return {
      country,
      currency,
      // never seen decimal currency base so I'll go with int parsing
      base: parseInt(base),
      code,
      rate: parseFloat(rate.replace(",", ".")),
    }
  })
  return {
    createdAt,
    index: parseInt(yearIndex),
    rates,
  }
};

/**
 * adapter converts 3rd party data into domain we like and use
 */
export const getMarketData = () => {
  return cnb
    .get<string>(
      "/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt"
    )
    .then(res => {
      return parseMarketTicket(res.data)
    });
};
