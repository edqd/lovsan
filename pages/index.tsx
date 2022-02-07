import type { NextPage } from "next";
import Head from "next/head";
import Header from "components/Header";
import TableRates from "components/TableRates";
import InputCurrency from "components/InputCurrency";
import { useState } from "react";
import { Rate } from "hooks/useExchangeList";
import Big from "big.js";
import Container, { Background, Emphasis, Main } from "components/Container";
import Notification from "components/Notification";

const convertMoney = (val: number, to: Rate) => {
  return new Big(val).div(to.rate).times(to.base).toNumber();
};

const Home: NextPage = () => {
  // something like zustand would probably be more appropriate in live app
  // instead of useState()
  const [costCalc, setCostCalc] = useState<{
    rate: Rate | undefined;
    amount: number | null;
    cost: number | null;
  }>({
    rate: undefined,
    amount: null,
    cost: null,
  });
  return (
    <Background>
      <Container data-testingid="rates-root">
        <Head>
          <title>A proper SEO title</title>
          <meta
            name="description"
            content="polyfunctional recalculation differentiator"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Main>
          <Header title="It's a bank">🏦</Header>
          <TableRates
            onSelect={(rate) => setCostCalc({ rate, cost: null, amount: null })}
            active={costCalc.rate}
          />
          {costCalc.rate ? (
            <>
              <Notification>{`How much CZK you have?`}</Notification>
              <InputCurrency
                onSubmit={(amount) => {
                  setCostCalc((prev) => {
                    if (amount) {
                      return {
                        ...prev,
                        cost: convertMoney(amount, costCalc.rate!),
                        amount,
                      };
                    }
                    return { ...prev, cost: null, amount: null };
                  });
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
            </>
          ) : (
            <Notification>Please, select a conversion rate.</Notification>
          )}
          {costCalc.cost && costCalc.rate && (
            <Notification>
              {`💵 Total value of ${costCalc.amount} CZK: `}
              <Emphasis data-testid="amount-cost">{`${costCalc.cost.toFixed(2).replace(".", ",")}`}</Emphasis>
              {`${costCalc.rate.code} 💵`}
            </Notification>
          )}
        </Main>

        <footer></footer>
      </Container>
    </Background>
  );
};

export default Home;
