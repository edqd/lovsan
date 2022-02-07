import { useQuery } from "react-query";

// better to have types generated for client, import
// is hopefully good enough for demo
import { RatesResponse } from "server/adapters/rest";

export type Rate = RatesResponse["rates"][0];

const baseUrl = "/api/rates";

const fetchList = () =>
  fetch(baseUrl).then((res) => {
    if (res.ok) {
      return res.json();
    }

    // bounce to sentry ^_^
    console.log({ res });
    throw new Error(res.statusText);
  });

export const useExchangeList = () => {
  return useQuery<RatesResponse>("rates", fetchList);
};
