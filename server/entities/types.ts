export interface MarketTicket {
  createdAt: Date;
  index: number;
  rates: {
    country: string;
    currency: string;
    base: number;
    code: string;
    rate: number;
  }[];
}
