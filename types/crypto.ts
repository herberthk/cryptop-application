type Signature = {
  signatureType: number;
  r: string;
  s: string;
  v: number;
};

type MetaData = {
  orderHash: string;
  remainingFillableTakerAmount: string;
  createdAt?: string;
  state?: string;
};

type Order = {
  signature: Signature;
  sender: string;
  maker: string;
  taker: string;
  takerTokenFeeAmount: string;
  makerAmount: string;
  takerAmount: string;
  makerToken: string;
  takerToken: string;
  salt: string;
  verifyingContract: string;
  feeRecipient: string;
  expiry: string;
  chainId: number;
  pool: string;
};

type Records = {
  order: Order;
  metaData: MetaData;
};

type Bids = {
  total: number;
  page: number;
  perPage: number;
  records: Records[];
};

export interface OrderBook {
  bids: Bids;
  asks: Bids;
}

export interface OrderBookUpdate {
  type: string;
  channel: string;
  payload: Records[];
  requestId: string;
}
