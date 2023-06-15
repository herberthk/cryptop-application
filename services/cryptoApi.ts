import { CryptoHistory, CryptoHistoryParams, CyptoDetails } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "x-rapidapi-host": process.env.NEXT_PUBLIC__CRYPTO_RAPIDAPI_HOST,
  "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
};
const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_CRYPTO_API_URL,
  }),
  endpoints: (builder) => ({
    getCryptoDetails: builder.query<CyptoDetails, string>({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query<CryptoHistory, CryptoHistoryParams>({
      query: ({ coinId, timeperiod }) =>
        createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
    }),
  }),
});

export const { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;
