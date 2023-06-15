import { cryptoApi } from "@/services/cryptoApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import token from "@/services/tokenSlice";
import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit/dist";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
  configureStore({
    reducer: {
      // Add the generated reducer as a specific top-level slice
      [cryptoApi.reducerPath]: cryptoApi.reducer,
      token,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cryptoApi.middleware),
    ...options,
    devTools: true,
  });

export const store = createStore();
// // optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// // see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
