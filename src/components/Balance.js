import React from "react";
import { useSelector } from "react-redux";
import numberWithCommas from "../utils/thousandComma";

const Balance = () => {
  const { transactions } = useSelector(state => state.transaction)

  const calculateIncome = ( transactions ) => {
    let balance = 0;
    transactions.forEach(transaction => {

      const {type,amount} = transaction
      if(type === 'income'){
        balance += amount
      } else {
        balance -= amount
      }
    })

    return balance
  }


  return (
    <div className="top_card">
      <p>Your Current Balance</p>
      <h3>
        <span>৳</span>{" "}
        {transactions.length > 0 ? ( <span>{numberWithCommas(calculateIncome(transactions))}</span>) : (0)}
       
      </h3>
    </div>
  );
};

export default Balance;
