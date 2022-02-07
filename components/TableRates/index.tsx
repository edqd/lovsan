import PulseLabel from "components/PulseLabel";
import { Rate, useExchangeList } from "hooks/useExchangeList";
import React, { useState, useMemo } from "react";
import { Row, Price, UnitPrice } from "./Row";
import { Footer } from "./Footer";
import Btn from "components/Btn"
import { Table, FullWidth } from "./Table";

const perPage = 10;

export const TableRates: React.FC<{
  onSelect: (rate: Rate) => void;
  active?: Rate;
}> = ({ onSelect, active }) => {
  const { isLoading, data, error } = useExchangeList();
  const [state, setState] = useState({ page: 0 });
  const { batch, hasMore } = useMemo(() => {
    if (data?.rates) {
      const start = state.page * perPage;
      const batch = data.rates.slice(state.page * perPage, start + 10);
      return { batch, hasMore: data.rates.length > start + 10 };
    }
    return { batch: [], hasMore: false };
  }, [data, state]);

  if (isLoading) {
    return (
      <FullWidth>
        <PulseLabel>Loading</PulseLabel>
      </FullWidth>
    );
  }

  if (error) {
    return (
      <FullWidth>
        Sorry, there was an error while downloading up-to-date information.
        Please try again later.
      </FullWidth>
    );
  }

  return (
    <FullWidth>
      <Table>
        {batch.map((rate) => {
          return (
            <Row
              key={rate.code}
              onClick={() => onSelect(rate)}
              data-testid={`table-row-${rate.code}`}
              active={rate.code === active?.code}
            >
              <span>{rate.country}</span>
              <Price>
                <span>{`${rate.base} ${rate.currency} (${rate.code}) at`}</span>

                <UnitPrice>{`${rate.rate
                  .toFixed(3)
                  .replace(".", ",")} CZK`}</UnitPrice>
              </Price>
            </Row>
          );
        })}
      </Table>
      <Footer>
        <Btn
          onClick={() => setState((prev) => ({ ...prev, page: prev.page - 1 }))}
          disabled={state.page < 1}
          data-testid="table-prev-btn"
        >
          Previous
        </Btn>
        <Btn
          onClick={() => setState((prev) => ({ ...prev, page: prev.page + 1 }))}
          disabled={!hasMore}
          data-testid="table-next-btn"
        >
          Next
        </Btn>
      </Footer>
    </FullWidth>
  );
};

export default TableRates;
