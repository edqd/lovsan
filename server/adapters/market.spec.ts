import { parseMarketTicket } from "./market";

describe("cnb adapter", () => {
  it("should parse str into domain data", () => {
    const str = `04.02.2022 #25
    země|měna|množství|kód|kurz
    Austrálie|dolar|1|AUD|15,070
    Brazílie|real|1|BRL|4,004
    Bulharsko|lev|1|BGN|12,456`;

    const actual = parseMarketTicket(str);

    expect(actual).toMatchObject({
      createdAt: new Date(2022, 1, 4),
      index: 25,
      rates: [
        {
          country: "Austrálie",
          currency: "dolar",
          base: 1,
          code: "AUD",
          rate: 15.07,
        },
        {
          country: "Brazílie",
          currency: "real",
          base: 1,
          code: "BRL",
          rate: 4.004,
        },
        {
          country: "Bulharsko",
          currency: "lev",
          base: 1,
          code: "BGN",
          rate: 12.456,
        },
      ],
    });
  });

  it("should parse str with no data", () => {
    const str = `04.02.2022 #25
    země|měna|množství|kód|kurz`;

    const actual = parseMarketTicket(str);

    expect(actual).toMatchObject({
      createdAt: new Date(2022, 1, 4),
      index: 25,
      rates: [],
    });
  })
});
