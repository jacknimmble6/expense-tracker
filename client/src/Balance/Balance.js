import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2'
import './styles.css'

ChartJS.register(ArcElement, Tooltip, Legend);

const Balance = () => {
    const [totalIncome, setTotalIncome] = useState([])
    const [totalExpense, setTotalExpense] = useState([])

    useEffect(() => {
        try {
          axios.get(`https://expense-tracker221.herokuapp.com/transactions/user/expense/${sessionStorage.getItem('token')}`)
          .then(res => setTotalExpense(res.data.sum))

          axios.get(`https://expense-tracker221.herokuapp.com/transactions/user/income/${sessionStorage.getItem('token')}`)
          .then(res => setTotalIncome(res.data.sum))

        } catch (error) {
          console.log(error)  
        }

        return () => {
          setTotalIncome([])
          setTotalExpense([])
        }
    }, [])
    
    const incomeSum = totalIncome.map(({ total }) => total )
    const expenseSum = totalExpense.map(({ total }) => total )

    const data = {
      labels: ['Income', 'Expense'],
      datasets: [
        {
          label: 'Income/Expense',
          data: [incomeSum, expenseSum],
          backgroundColor: [
            'rgba(0, 128, 0)',
            'rgba(255, 0, 0)',
          ],
          borderColor: [
            'rgba(0, 128, 0)',
            'rgba(255, 0, 0)',
          ],
          borderWidth: 1,
        },
      ],
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    };

    return (
      <> 
        <Doughnut data={data} height={"130%"} width={"90%"} redraw={true} 
        options={{ maintainAspectRatio: false }} id='doughnut'/>
         
        <div id='bbb'>
          <p id='heading'>Total Balance</p>

          <p id='income'>
            Income: ${incomeSum === undefined ? 0 : incomeSum}
          </p>

          <p id='plus'>
            -
          </p>

          <p id='expense'>
            Expense: ${expenseSum}
          </p>
          
          <p id='total'>
            Total: {Intl.NumberFormat('en-IN', { 
              style: 'currency', currency: 'USD', maximumSignificantDigits: 3 
              }
            ).format(incomeSum - expenseSum)}
          </p>
        </div>
      </>
    )
}

export default Balance