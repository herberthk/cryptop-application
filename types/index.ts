export * from "./crypto";
export type Token = {
  token: string;
  name: string;
  iconUrl: string;
  id: string;
  code: string;
};

export interface TokenState {
  baseToken: Token | null;
  quoteToken: Token | null;
}

export type Icon = {
  name: string;
  iconUrl: string;
};

type History = {
  price: string;
  timestamp: number;
};

export interface CryptoHistory {
  status: string;
  data: {
    change: string;
    history: History[];
  };
}

type Link = {
  name: string;
  type: string;
  url: string;
};
type Supply = {
  confirmed: boolean;
  supplyAt: number;
  max: string;
  total: string;
  circulating: string;
};

type AllTimeHigh = {
  price: string;
  timestamp: number;
};

type Coin = {
  uuid: string;
  symbol: string;
  name: string;
  description: string;
  color: string;
  iconUrl: string;
  websiteUrl: string;
  links: Link[];
  supply: Supply;
  numberOfMarkets: number;
  numberOfExchanges: number;
  "24hVolume": string;
  marketCap: string;
  fullyDilutedMarketCap: string;
  price: string;
  btcPrice: string;
  priceAt: number;
  change: string;
  rank: number;
  sparkline: string[];
  allTimeHigh: AllTimeHigh;
  coinrankingUrl: string;
  tier: number;
  lowVolume: boolean;
  listedAt: number;
  hasContent: boolean;
  notices: string | null;
  tags: string[];
};

export interface CyptoDetails {
  status: string;
  data: {
    coin: Coin;
  };
}

export type CryptoHistoryParams = {
  coinId: string;
  timeperiod: string;
};

type Datasets = {
  label?: string;
  data: number[];
  fill?: boolean;
  backgroundColor?: string;
  borderColor?: string;
};

export interface LineGraphData {
  labels: string[];
  datasets: Datasets[];
}
