import { Token, TokenState } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const isBrowser = typeof window !== "undefined";

const initialState: TokenState = {
  baseToken: isBrowser
    ? localStorage.getItem("baseToken")
      ? JSON.parse(localStorage.getItem("baseToken")!)
      : null
    : null,
  quoteToken: isBrowser
    ? localStorage.getItem("quoteToken")
      ? JSON.parse(localStorage.getItem("quoteToken")!)
      : null
    : null,
};

const token = createSlice({
  name: "Token",
  initialState,
  reducers: {
    updateBaseToken: (state, action: PayloadAction<Token>) => {
      state.baseToken = action.payload;
      localStorage.setItem("baseToken", JSON.stringify(action.payload));
    },
    updateQuoteToken: (state, action: PayloadAction<Token>) => {
      state.quoteToken = action.payload;
      localStorage.setItem("quoteToken", JSON.stringify(action.payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateBaseToken, updateQuoteToken } = token.actions;

export default token.reducer;
