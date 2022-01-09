import React, { createContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const MyContext = createContext()

const MyContextProvider = ({ children }) => {
    const [startDate, setStartDate] = useState(new Date())
    const [transactionName, setTransactionName] = useState('')
    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState(Number)
    const [tab, setTab] = useState('Income')
    const [totalIncome, setTotalIncome] = useState([])
    const [totalExpense, setTotalExpense] = useState([])
    const [auth, setAuth] = useState('')
    const dispatch = useDispatch()

    const onDateChange = (day) => {
      setStartDate(day)
    }

    const handleSetAmount = (e) => {
      setAmount(parseInt(e.target.value))
    }

    const handleSetTransaction = (e) => {
      setTransactionName(e.target.value)
    }

    const handleSetTab = (e) => {
      if (e.target.value !== 'Expense') {
        setTab('Income')
      } else {
        setTab('Expense')
      }
    }
    
    const handleSetCategory = (e) => {
      setCategory(e.target.value)
    }

    const resetInputFields = () => {
      setStartDate(new Date())
      setTransactionName('')
      setAmount('')
      setCategory('')
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch({
            type: 'submit',
            payload: { startDate, transactionName, category, amount, tab }
        })
  
        const newTransactionData = {
          username: `${sessionStorage.getItem('token')}`,
          name: transactionName,
          category: category,
          amount: amount,
          date: startDate.toLocaleDateString(),
        }
        if (tab === 'Expense') {
          axios.post(`https://expense-tracker221.herokuapp.com/transactions/user/expense/add/${sessionStorage.getItem('token')}`, 
          newTransactionData)
       
          resetInputFields()
        } else {
          axios.post(`https://expense-tracker221.herokuapp.com/transactions/user/income/add/${sessionStorage.getItem('token')}`, 
          newTransactionData)
          resetInputFields()
        }
    }

    return (
        <MyContext.Provider value={{
            startDate, setStartDate, transactionName, setTransactionName, category, auth, setAuth,
            setCategory, amount, setAmount, tab, setTab, onDateChange, handleSetCategory, 
            handleSetAmount, handleSetTransaction, handleSetTab, handleOnSubmit, resetInputFields,
            totalIncome, setTotalIncome, totalExpense, setTotalExpense,
        }}>
            {children}
        </MyContext.Provider>
    )
}

export { MyContext, MyContextProvider }