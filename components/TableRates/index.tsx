import PulseLabel from "components/PulseLabel";
import { Rate, useExchangeList } from "hooks/useExchangeList";
import React, { useState, useMemo } from "react";
import CurrencyCell from "./CurrencyCell";

const perPage = 10;

export const TableRates: React.FC<{ onSelect: (rate: Rate) => void }> = ({
  onSelect,
}) => {
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
    return <PulseLabel>Loading</PulseLabel>;
  }

  if (error) {
    return <div>rip</div>;
  }

  return (
    <div>
      <table>
        {batch.map((rate) => {
          return (
            <tr
              key={rate.code}
              onClick={() => onSelect(rate)}
              data-testid={`table-row-${rate.code}`}
            >
              <td>{rate.country}</td>
              <td>{`${rate.base} ${rate.currency} (${rate.code})`}</td>
              <CurrencyCell>
                {rate.rate.toFixed(3).replace(".", ",")}
              </CurrencyCell>
            </tr>
          );
        })}
      </table>
      <button
        onClick={() => setState((prev) => ({ ...prev, page: prev.page - 1 }))}
        disabled={state.page < 1}
        data-testid="table-prev-btn"
      >
        Previous
      </button>
      <button
        onClick={() => setState((prev) => ({ ...prev, page: prev.page + 1 }))}
        disabled={!hasMore}
        data-testid="table-next-btn"
      >
        Next
      </button>
    </div>
  );
};

export default TableRates;
