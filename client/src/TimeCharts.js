import React, { useEffect } from 'react'
import axios from 'axios'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const TimeCharts = () => {
  
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get(`https://expense-tracker221.herokuapp.com/transactions/user/expense/${sessionStorage.getItem('token')}`)
    .then(res =>  res.data.expenseDateDataDay.length === 0 || 
      res.data.expenseDateDataWeek.length === 0 || res.data.expenseDateDataMonth === 0 ?
      null : 
      dispatch({
      type: 'addData',
      payload: {
        dayData: res.data.expenseDateDataDay[0].totalAmount,
        weekData: res.data.expenseDateDataWeek[0].totalAmount,
        monthData: res.data.expenseDateDataMonth[0].totalAmount
      }
    }))

    axios.get(`https://expense-tracker221.herokuapp.com/transactions/user/income/${sessionStorage.getItem('token')}`)
    .then(res =>  res.data.incomeDateDataDay.length === 0 || 
      res.data.incomeDateDataWeek.length === 0 || res.data.incomeDateDataMonth === 0 ?
      null : dispatch({
      type: 'addData2',
      payload: {
        dayData: res.data.incomeDateDataDay[0].totalAmount,
        weekData: res.data.incomeDateDataWeek[0].totalAmount,
        monthData: res.data.incomeDateDataMonth[0].totalAmount,
      }
    })
    )

  }, [dispatch])

  const dayData = useSelector(state => state.expensetimedata.dayData)
  const weekData = useSelector(state => state.expensetimedata.weekData)
  const monthData = useSelector(state => state.expensetimedata.monthData)

  const incomeDayData = useSelector(state => state.incometimedata.dayData)
  const incomeWeekData = useSelector(state => state.incometimedata.weekData)
  const incomeMonthData = useSelector(state => state.incometimedata.monthData)

  const labels = ['Today', 'Last week', 'This month'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: [incomeDayData, incomeWeekData, incomeMonthData],
        borderColor: 'rgba(0, 160, 8, 0.8)',
        backgroundColor: 'rgba(0, 160, 8, 0.8)',
      },
      {
        label: 'Expense',
        data: [-dayData, -weekData, -monthData],
        borderColor: 'rgba(211, 0, 0, 0.8)',
        backgroundColor: 'rgba(211, 0, 0, 0.8)',
      },
      {
        label: 'Total Balance',
        data: [incomeDayData - dayData, incomeWeekData - weekData, incomeMonthData - monthData],
        borderColor: 'rgba(64, 141, 227, 0.8)',
        backgroundColor: 'rgba(64, 141, 227, 0.8)'
      }
    ],
    options: {
      responsive: false,
      maintainAspectRatio: false
    }
  };

  return (
    <div>
      <Bar options={{ maintainAspectRatio: false }} data={data} height={"290%"} width={"90%"} redraw={true} />
    </div>
    )
}

export default TimeCharts
