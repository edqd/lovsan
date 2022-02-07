import type { NextPage } from "next";
import Head from "next/head";
import Header from "components/Header";
import TableRates from "components/TableRates";
import InputCurrency from "components/InputCurrency";


const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>cash money</title>
        <meta
          name="description"
          content="polyfunctional recalculation differentiator"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header>pozdravy z ostravy</Header>
        <TableRates />
        <InputCurrency />
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
