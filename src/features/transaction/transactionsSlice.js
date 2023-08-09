import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  getTransactions,
} from "./transactionApi";

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: "",
  editing : {}
};

// async thunks
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    const transactions = await getTransactions();

    return transactions;
  }
);

export const createTransaction = createAsyncThunk(
  "transactions/createTransaction",
  async (data) => {
    const transaction = await addTransaction(data);

    return transaction;
  }
);

export const updateTransactions = createAsyncThunk(
  "transactions/updateTransaction",
  async ({ id, data }) => {
    const transaction = await editTransaction(id, data);

    return transaction;
  }
);

export const removeTransactions = createAsyncThunk(
  "transactions/removeTransaction",
  async (id) => {
    const transaction = await deleteTransaction(id);

    return transaction;
  }
);

// create slice

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers : {
    editActive : (state, action) => {
        state.editing = action.payload
    },
    editInActive : (state, action) => {
        state.editing = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.transactions = [];
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions = action.payload;
      })

      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.transactions = [];
        state.error = action?.error?.message;
      })

      .addCase(createTransaction.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions.push(action.payload);
      })

      .addCase(createTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action?.error?.message;
      })


      .addCase(updateTransactions.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const indexToUpdate = state.transactions.findIndex(
            t => t.id === action.payload.id
        )

        state.transactions[indexToUpdate] = action.payload
      })

      .addCase(updateTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action?.error?.message;
      })


      .addCase(removeTransactions.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(removeTransactions.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.isError = false;
       state.transactions = state.transactions.filter(t => t.id !== action.meta.arg)
      })

      .addCase(removeTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action?.error?.message;
      })
  },
});


export default transactionsSlice.reducer
export const {editActive, editInActive} = transactionsSlice.actions