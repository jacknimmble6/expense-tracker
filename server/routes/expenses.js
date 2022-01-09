import express from 'express'
import { createExpense, createIncome, getExpenseData, getIncomeData, updateExpense, 
updateIncome, getExpenseById, getIncomeById, deleteIncomebyId, deleteExpensebyId, 
getIncomeDataById, getExpenseDataById, addIncomeDataById, addExpenseDataById} 
from '../controllers/expenses.js'
import { registerUser, loginUser } from '../controllers/user.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/expense', auth, getExpenseData)
router.get('/income', auth, getIncomeData)

router.post('/income/add', auth, createIncome)
router.post('/expense/add', auth, createExpense)

router.get('/expense/:id', auth, getExpenseById)
router.get('/income/:id', auth, getIncomeById)

router.patch('/income/:id', auth, updateIncome)
router.patch('/expense/:id', auth, updateExpense)

router.delete('/income/:id', auth, deleteIncomebyId)
router.delete('/expense/:id', auth, deleteExpensebyId)

router.get('/user/income/:id', auth, getIncomeDataById)
router.get('/user/expense/:id', auth, getExpenseDataById)

router.post('/user/income/add/:id', auth, addIncomeDataById)
router.post('/user/expense/add/:id', auth, addExpenseDataById)

router.post('/user/register', registerUser)
router.post('/user/login', loginUser)

export default router
