import type { NextPage } from "next";
import Head from "next/head";
import Header from "components/Header";
import TableRates from "components/TableRates";
import InputCurrency from "components/InputCurrency";
import { useState } from "react";
import { Rate } from "hooks/useExchangeList";
import Big from "big.js";
import Highlight from "components/Highlight";

const convertMoney = (val: number, to: Rate) => {
  return new Big(val).times(to.rate).div(to.base).toNumber();
};

const Home: NextPage = () => {
  // something like zustand would probably be more appropriate in live app
  // instead of useState()
  const [costCalc, setCostCalc] = useState<{
    rate: Rate | undefined;
    cost: number | null;
  }>({
    rate: undefined,
    cost: null,
  });
  return (
    <div data-testingid="rates-root">
      <Head>
        <title>A proper SEO title</title>
        <meta
          name="description"
          content="polyfunctional recalculation differentiator"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header>pozdravy z ostravy</Header>
        <TableRates onSelect={(rate) => setCostCalc({ rate, cost: null })} />
        {costCalc.rate ? (
          <InputCurrency
            onSubmit={(amount) => {
              setCostCalc((prev) => ({
                ...prev,
                cost: convertMoney(amount, costCalc.rate!),
              }));
            }}
            validate={(val) => {
              if (!val) {
                return "Please provide an amount";
              }
              if (val < 0) {
                return "Please provide amount greater than 0";
              }
            }}
          />
        ) : (
          <div>hint to select rate</div>
        )}
        {costCalc.cost && (
          <Highlight data-testid="amount-cost">{`${costCalc.cost
            .toFixed(2)
            .replace(".", ",")} CZK`}</Highlight>
        )}
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
