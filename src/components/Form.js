import React, { useEffect, useState } from "react";
import {
  createTransaction,
  updateTransactions,
} from "../features/transaction/transactionsSlice";
import { useDispatch, useSelector } from "react-redux";

const Form = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [editMode, setEditMode] = useState(false);
  const { isLoading, isError } = useSelector((state) => state.transaction);
  const { editing } = useSelector((state) => state.transaction);

  // console.log(editing);
  useEffect(() => {
    const { id, name, type, amount } = editing || {};
    console.log(id, name, type, amount);
    if (id) {
      setEditMode(true);
      setName(name);
      setAmount(amount);
      setType(type);
    } else {
      reset();
      setEditMode(false);
    }
  }, [editing]);

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(
      createTransaction({
        name,
        type,
        amount: Number(amount),
      })
    );
    reset();
    setEditMode(false);
  };

  const reset = () => {
    setName("");
    setAmount("");
    setType("");
  };

  const cancelEditMode = () => {
    setEditMode(false);
    reset();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateTransactions({
        id: editing?.id,
        data: {
          name: name,
          type: type,
          amount: amount,
        },
      })
    );
    reset();
    setEditMode(false);
  };

  return (
    <div className="form">
      <h3>Add new transaction</h3>

      <form onSubmit={editMode ? handleUpdate : handleCreate}>
        <div className="form-group">
          <label>Name</label>
          <input
            required
            type="text"
            name="name"
            placeholder="Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group radio">
          <label>Type</label>
          <div className="radio_group">
            <input
              required
              type="radio"
              value="income"
              onChange={(e) => setType("income")}
              checked={type === "income"}
              name="type"
            />
            <label>Income</label>
          </div>
          <div className="radio_group">
            <input
              onChange={(e) => setType("expense")}
              checked={type === "expense"}
              type="radio"
              value="expense"
              name="type"
              placeholder="Expense"
            />
            <label>Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            required
            type="number"
            placeholder="300"
            name="transaction_amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button disabled={isLoading} className="btn" type="submit">
          {editMode ? "Update Transaction" : "Add Transaction"}
        </button>

        {isError && <p className="error">Some Error Occured</p>}
      </form>

      {editMode && (
        <button onClick={cancelEditMode} className="btn cancel_edit">
          Cancel Edit
        </button>
      )}
    </div>
  );
};

export default Form;
