import mongoose from 'mongoose'

const ExpenseSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

const Expense = mongoose.model('Expense', ExpenseSchema)

export default Expense
