import { combineReducers } from 'redux'
import Expense from './Expense'
import Income from './Income'
import TimeChartData from './TimeChartData'
import TimeChartData2 from './TimeChartData2'

export default combineReducers({
    expense: Expense, 
    income: Income,
    expensetimedata: TimeChartData,
    incometimedata: TimeChartData2
})