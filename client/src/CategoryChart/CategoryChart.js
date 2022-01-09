import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import './styles.css'
import { Text } from '@chakra-ui/react'

ChartJS.register(ArcElement, Tooltip, Legend)

const CategoryChart = () => {
  const dispatch = useDispatch()
  const [noExpenseData, setNoExpenseData] = useState('')
  const [noIncomeData, setNoIncomeData] = useState('')

    useEffect(() => {
        try {
          axios.get(`https://expense-tracker221.herokuapp.com/transactions/user/expense/${sessionStorage.getItem('token')}`)
          .then(res => res.data.entertainment.length === 0 || res.data.shopping.length === 0 ||
            res.data.gifts.length === 0 || res.data.kids.length === 0 || 
            res.data.general.length === 0 || res.data.travel.length === 0 || 
            res.data.utilities.length === 0 || res.data.clothes.length === 0 || 
            res.data.sports.length === 0 || res.data.other.length === 0 ?
            setNoExpenseData('Need at least one expense of each category') : dispatch({ 
            type: 'addExpense',
            payload: {
              entertainment: res.data.entertainment[0].total,
              shopping: res.data.shopping[0].total,
              gifts: res.data.gifts[0].total,
              kids: res.data.kids[0].total,
              general: res.data.general[0].total,
              travel: res.data.travel[0].total,
              utilities: res.data.utilities[0].total,
              clothes: res.data.clothes[0].total,
              sports: res.data.sports[0].total,
              other1: res.data.other[0].total
            }  
          }))

          axios.get(`https://expense-tracker221.herokuapp.com/transactions/user/income/${sessionStorage.getItem('token')}`)
          .then(res => res.data.other.length === 0 || res.data.stocks.length === 0 || 
            res.data.investment.length === 0 || res.data.business.length === 0 || 
            res.data.salary.length === 0 ?
            setNoIncomeData('Need at least one income of each category') : dispatch({
              type: 'addIncome',
              payload: {
                salary: res.data.salary[0].total,
                investment: res.data.investment[0].total,
                business: res.data.business[0].total,
                stocks: res.data.stocks[0].total,
                other: res.data.other[0].total
              }
            })
          )
  
        } catch (error) {
          console.log(error)  
        }

    }, [dispatch])

    const byEntertainment = useSelector(state => state.expense.entertainment)
    const byShopping = useSelector(state => state.expense.shopping)
    const byGifts = useSelector(state => state.expense.gifts)
    const byTravel = useSelector(state => state.expense.travel)
    const byUtilities = useSelector(state => state.expense.utilities)
    const bySports = useSelector(state => state.expense.sports)
    const byGeneral = useSelector(state => state.expense.general)
    const byKids = useSelector(state => state.expense.kids)
    const byOther1 = useSelector(state => state.expense.other1)

    const bySalary = useSelector(state => state.income.salary)
    const byInvestment  = useSelector(state => state.income.investment)
    const byBusiness = useSelector(state => state.income.business)
    const byStocks = useSelector(state => state.income.stocks)
    const byOther = useSelector(state => state.income.other)

    const data = {
      labels: ['Entertainment', 'Shopping', 'Gifts', 'Travel', 'Utilities', 
      'Sports', 'General', 'Kids', 'Other1'],
      datasets: [
        {
          label: 'Expense Categories',
          data: [byEntertainment, byShopping, byGifts, byTravel, byUtilities, 
            bySports, byGeneral, byKids, byOther1],
          backgroundColor: [
            'rgba(255, 0, 90, 0.48)',
            'rgba(224, 158, 45, 1)',
            'rgba(0, 207, 127, 0.72)',
            'rgba(139, 79, 255, 0.72)',
            'rgba(0, 104, 255, 0.72)',
            'rgba(240, 0, 238, 0.72)',
            'rgba(160, 8, 220, 0.76)',
            'rgba(45, 224, 46, 1)', 
            'violet',
            'blue'
          ],
          borderColor: [
            'rgba(255, 0, 90, 0.48)',
            'rgba(224, 158, 45, 1)',
            'rgba(0, 207, 127, 0.72)',
            'rgba(139, 79, 255, 0.72)',
            'rgba(0, 104, 255, 0.72)',
            'rgba(240, 0, 238, 0.72)',
            'rgba(160, 8, 220, 0.76)',
            'rgba(45, 224, 46, 1)', 
            'violet',
            'blue'
          ],
          borderWidth: 1,
        },
      ],
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
    
    const data2 = {
      labels: ['Salary', 'Investment', 'Business', 'Stocks', 'Other'],
      datasets: [
        {
          label: 'Income Categories',
          data: [bySalary, byInvestment, byBusiness, byStocks, byOther],
          backgroundColor: [
            'rgba(44, 108, 18, 0.72)',
            'rgba(21, 115, 130, 0.72)',
            'rgba(95, 37, 118, 0.68)', 
            'rgba(18, 29, 108, 0.72)',
            'rgba(47, 32, 133, 0.72)'
          ],
          borderColor: [
            'rgba(44, 108, 18, 0.72)',
            'rgba(21, 115, 130, 0.72)',
            'rgba(95, 37, 118, 0.68)', 
            'rgba(18, 29, 108, 0.72)',
            'rgba(47, 32, 133, 0.72)'
          ],
          borderWidth: 1,
        },
      ],
      options: {
        responsive: false,
        maintainAspectRatio: false
      }
    };

    return (
        <>
          <div id='chart1'>
            <Text color='red'>
              {noExpenseData}
            </Text>

            <Doughnut data={data} height={"20%"} width={"25%"} redraw={true} 
            options={{ maintainAspectRatio: false }} />
          </div>   

          <div id='chart2'>
            <Text color='red'>
              {noIncomeData}
            </Text>

            <Doughnut data={data2} height={"20%"} width={"25%"} redraw={true} 
            options={{ maintainAspectRatio: false }} />   
          </div>
        </>
    )
}

export default CategoryChart
