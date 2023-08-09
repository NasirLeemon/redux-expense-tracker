import React from 'react'
import editImg from '../../assets/images/edit.svg'
import deleteImg from '../../assets/images/delete.svg'
import { editActive, removeTransactions } from '../../features/transaction/transactionsSlice'
import { useDispatch } from 'react-redux'

const Transaction = ({transaction}) => {
    const dispatch =useDispatch()

    const {id, name, type, amount} = transaction || {}


const handleEdit = () =>{
    dispatch(editActive(transaction))
} 

const handleDelete = () => {
    dispatch(removeTransactions(id))
}

  return (
    <li className={`transaction ${type}`}>
    <p>{name}</p>
    <div className="right">
        <p>৳ {amount}</p>
        <button className="link" onClick={handleEdit}>
            <img
            alt='edit'
                className="icon"
                src={editImg}
            />
        </button>
        <button className="link" onClick={handleDelete}>
            <img
            alt='delete'
                className="icon"
                src={deleteImg}
            />
        </button>
    </div>
</li>
  )
}

export default Transaction