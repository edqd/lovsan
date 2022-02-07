import TableRates from ".";
import { render, screen } from "@testing-library/react";
import { useExchangeList } from "hooks/useExchangeList";

jest.mock("hooks/useExchangeList");

describe("table of rates", () => {
  it("loads and displays some data", () => {
    const onSelect = jest.fn();
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
    render(<TableRates onSelect={onSelect} />);

    expect(screen.getByTestId("table-row-AUD")).toBeVisible();
    expect(screen.getByTestId("table-prev-btn")).toBeDisabled();
    expect(screen.getByTestId("table-next-btn")).toBeDisabled();
  });

  it("shows loading while loading", () => {
    const onSelect = jest.fn();
    (useExchangeList as jest.Mock).mockReturnValue({
      error: undefined,
      isLoading: true,
      data: {},
    });
    render(<TableRates onSelect={onSelect} />);

    expect(screen.getByText("Loading")).toBeVisible();
  });
});
