import mongoose from 'mongoose'

const IncomeSchema = new mongoose.Schema({
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

const Income = mongoose.model('Income', IncomeSchema)

export default Income
