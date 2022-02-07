import { useQuery } from "react-query";

const baseUrl =
  "https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt";

const fetchList = () =>
  fetch(baseUrl).then((res) => {
    if (res.ok) {
      return res.text();
    }

    console.log({ res });
    throw new Error(res.statusText);
  });

export const useExchangeList = () => {
  return useQuery("todos", fetchList);
};
