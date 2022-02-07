import axios from "axios";

export const handler = axios.create({
  baseURL: "https://www.cnb.cz",
  headers: { Accepts: "text/plain" },
});

export default handler;
