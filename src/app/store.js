import { configureStore } from "@reduxjs/toolkit";

import transactionReducer from "../features/transaction/transactionsSlice";

export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
  },
});
