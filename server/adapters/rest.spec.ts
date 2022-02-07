import request from "supertest";
import express from "express";
import cnb from "../infra/cnb";
import { restApiAdapter } from "./rest";

// DI would be probably more suited for things larger than demo
jest.mock("../infra/cnb");

const app = express();

app.use("/api", restApiAdapter);

describe("json responses", () => {
  it("can fetch rates", (done) => {
    (cnb.get as jest.Mock).mockResolvedValue({
      data: `04.02.2022 #25
    země|měna|množství|kód|kurz
    Austrálie|dolar|1|AUD|15,070
    Brazílie|real|1|BRL|4,004
    Bulharsko|lev|1|BGN|12,456`,
    });

    request(app)
      .get("/api/rates")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(
        200,
        {
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
        },
        done
      );
  });
});
