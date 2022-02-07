import Home from "../pages";
import { render, fireEvent, screen } from "@testing-library/react";
import { useExchangeList } from "hooks/useExchangeList";

jest.mock("hooks/useExchangeList");

describe("conversion cost calculation", () => {
  it("calculates cost", () => {
    (useExchangeList as jest.Mock).mockReturnValue({
      error: undefined,
      isLoading: false,
      data: {
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
    });
    render(<Home />);

    fireEvent.click(screen.getByTestId("table-row-AUD"));
    fireEvent.change(screen.getByTestId("amount-input"), {
      target: { value: "23" },
    });
    fireEvent.click(screen.getByTestId("amount-submit"));

    expect(screen.getByTestId("amount-cost")).toHaveTextContent("1,53");
  });
});
