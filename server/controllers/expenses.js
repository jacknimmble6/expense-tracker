import express from 'express'
import Income from '../models/IncomeModel.js'
import Expense from '../models/ExpenseModel.js'
import mongoose from 'mongoose'

const router = express.Router()

export const getIncomeData = async (req, res) => {
  const d = new Date();
  const day = d.getDate() 
  const m = d.getMonth() + 1;
  const oneJan = new Date(d.getFullYear(),0,1);
  const numberOfDays = Math.floor((d - oneJan) / (24 * 60 * 60 * 1000));
  const result = Math.ceil(( d.getDay() + 1 + numberOfDays) / 7);
  const user = req.params.user

    try {
        const IncomeData = await Income.aggregate(
          [
            {
                '$match': {
                  username: req.query.user
                }
            }
        ]
        )
        
        const sum = await Income.aggregate([
            {   
                $group: {
                  _id: null,
                  total: {
                    $sum: "$amount"
                  }
                },
            },
 
        ])
        
        const bySalary = await Income.aggregate([
            {
              '$match': {
     
                'category': 'Salary'
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ])

        const byInvestment = await Income.aggregate([
            {
              '$match': {
              
                'category': 'Investment'
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ])

        const byStocks = await Income.aggregate([
            {
              '$match': {
            
                'category': 'Stocks'
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ])

        const byBusiness = await Income.aggregate([
            {
              '$match': {
           
                'category': 'Business'
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ])

        const byOther = await Income.aggregate([
            {
              '$match': {
            
                'category': 'Other'
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ])

          const incomeDateDataMonth = await Income.aggregate(
            [
              {
                '$project': {
                  'createdAtWeek': {
                    '$week': '$date'
                  }, 
                  'createdAtMonth': {
                    '$month': '$date'
                  }, 
                  'amount': 1
                }
              }, {
                '$group': {
                  '_id': '$createdAtWeek', 
                  'totalSum': {
                    '$sum': '$amount'
                  }, 
                  'month': {
                    '$first': '$createdAtMonth'
                  }
                }
              }, {
                '$match': {
             
                  'month': m
                }
              }, {
                '$group': {
                  '_id': null, 
                  'totalAmount': {
                    '$sum': '$totalSum'
                  }
                }
              }
            ]
          )
          
          const incomeDateDataWeek = await Income.aggregate(
            [
              {
                '$project': {
                  'createdAtWeek': {
                    '$week': '$date'
                  }, 
                  'createdAtMonth': {
                    '$month': '$date'
                  }, 
                  'amount': 1
                }
              }, {
                '$group': {
                  '_id': '$createdAtWeek', 
                  'totalAmount': {
                    '$sum': '$amount'
                  }, 
                  'week': {
                    '$first': '$createdAtWeek'
                  }
                }
              }, {
                '$match': {
             
                  'week': result - 1
                }
              }
            ]
          )
  
          const incomeDateDataDay = await Income.aggregate(
            [
              {
                  '$project': {
                      'createdAtMonth': {
                          '$month': '$date'
                      }, 
                      'createdAtDay': {
                          '$dayOfMonth': '$date'
                      }, 
                      'amount': 1
                  }
              }, {
                  '$group': {
                      '_id': '$createdAtDay', 
                      'totalAmount': {
                          '$sum': '$amount'
                      }, 
                      'month': {
                          '$first': '$createdAtMonth'
                      }, 
                      'day': {
                          '$first': '$createdAtDay'
                      }
                  }
              }, {
                  '$match': {
                    
                      'month': m, 
                      'day': day
                  }
              }
          ]
          )

        const income = {
          incomedata: IncomeData, 
          sum: sum, 
          salary: bySalary, 
          investment: byInvestment, 
          other: byOther,
          business: byBusiness,
          stocks: byStocks,
          incomeDateDataMonth: incomeDateDataMonth,
          incomeDateDataWeek: incomeDateDataWeek,
          incomeDateDataDay: incomeDateDataDay
        }
        res.status(200).json(income)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getExpenseData = async (req, res) => {
    const d = new Date();
    const day = d.getDate() 
    const m = d.getMonth() + 1;
    const oneJan = new Date(d.getFullYear(),0,1);
    const numberOfDays = Math.floor((d - oneJan) / (24 * 60 * 60 * 1000));
    const result = Math.ceil(( d.getDay() + 1 + numberOfDays) / 7);

    try {
        const ExpenseData = await Expense.find()
       
        const sum = await Expense.aggregate([
            {   
                $group: {
                  _id: null,
                  total: {
                    $sum: "$amount"
                  }
                }
            }, 
        ])

        const byClothes = await Expense.aggregate([
            {
              '$match': {
              
                'category': 'Clothes'
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ])

        const byEntertainment = await Expense.aggregate([
            {
              '$match': {
         
                'category': 'Entertainment'
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ])

        const byShopping = await Expense.aggregate([
            {
              '$match': {
      
                'category': 'Shopping'
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ])

        const byTravel = await Expense.aggregate([
            {
              '$match': {
     
                'category': 'Travel'
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ])

        const byGifts = await Expense.aggregate([
            {
              '$match': {
          
                'category': 'Gifts'
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ])

        const byUtilities = await Expense.aggregate([
            {
              '$match': {
      
                'category': 'Utilities'
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ])

        const byGeneral = await Expense.aggregate([
            {
              '$match': {

                'category': 'General'
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ])

        const byOther = await Expense.aggregate([
            {
              '$match': {
          
                'category': 'Other'
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ])

        const byKids = await Expense.aggregate([
            {
              '$match': {
             
                'category': 'Kids'
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ])

        const bySports = await Expense.aggregate([
            {
              '$match': {
           
                'category': 'Sports'
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ])

        const expenseDateDataMonth = await Expense.aggregate(
          [
            {
              '$project': {
                'createdAtWeek': {
                  '$week': '$date'
                }, 
                'createdAtMonth': {
                  '$month': '$date'
                }, 
                'amount': 1
              }
            }, {
              '$group': {
                '_id': '$createdAtWeek', 
                'totalSum': {
                  '$sum': '$amount'
                }, 
                'month': {
                  '$first': '$createdAtMonth'
                }
              }
            }, {
              '$match': {
            
                'month': m
              }
            }, {
              '$group': {
                '_id': null, 
                'totalAmount': {
                  '$sum': '$totalSum'
                }
              }
            }
          ]
        )
        
        const expenseDateDataWeek = await Expense.aggregate(
          [
            {
              '$project': {
                'createdAtWeek': {
                  '$week': '$date'
                }, 
                'createdAtMonth': {
                  '$month': '$date'
                }, 
                'amount': 1
              }
            }, {
              '$group': {
                '_id': '$createdAtWeek', 
                'totalAmount': {
                  '$sum': '$amount'
                }, 
                'week': {
                  '$first': '$createdAtWeek'
                }
              }
            }, {
              '$match': {
             
                'week': result - 1
              }
            }
          ]
        )

        const expenseDateDataDay = await Expense.aggregate(
          [
            {
              '$project': {
                'createdAtMonth': {
                  '$month': '$date'
                }, 
                'createdAtDay': {
                  '$dayOfMonth': '$date'
                }, 
                'amount': 1
              }
            }, {
              '$group': {
                '_id': '$createdAtDay', 
                'totalAmount': {
                  '$sum': '$amount'
                }, 
                'month': {
                  '$first': '$createdAtMonth'
                }, 
                'day': {
                  '$first': '$createdAtDay'
                }
              }
            }, {
              '$match': {
              
                'month': m, 
                'day': day
              }
            }
          ]
        )

        const expense = {
            expensedata: ExpenseData, 
            sum: sum, 
            entertainment: byEntertainment, 
            shopping: byShopping,
            sports: bySports,
            kids: byKids,
            other: byOther,
            general: byGeneral,
            utilities: byUtilities,
            gifts: byGifts,
            travel: byTravel,
            clothes: byClothes,
            expenseDateDataMonth: expenseDateDataMonth,
            expenseDateDataWeek: expenseDateDataWeek,
            expenseDateDataDay: expenseDateDataDay
        }
        res.status(200).json(expense)
    } catch (error) {
        console.log(error.message)
    }
}

export const createIncome = async (req, res) => {
    const { name, category, amount, date, username } = req.body;

    const newIncome = new Income({ name, category, amount, date, username })
    try {
        await newIncome.save();

        res.status(201).json(newIncome);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const createExpense = async (req, res) => {
    const { name, category, amount, date, username } = req.body;

    const newExpense = new Expense({ name, category, amount, date, username })

    try {
        await newExpense.save();

        res.status(201).json(newExpense);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateIncome = async (req, res) => {
  const { id } = req.params;
  const { name, category, amount, date } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No income with id: ${id}`);

  const updatedIncome = { name, category, amount, date, _id: id };

  await Income.findByIdAndUpdate(id, updatedIncome, { new: true });

  res.json(updatedIncome);
}

export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { name, category, amount, date } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No expense with id: ${id}`);

  const updatedExpense = { name, category, amount, date, _id: id };

  await Expense.findByIdAndUpdate(id, updatedExpense, { new: true });

  res.json(updatedExpense);
}

export const getIncomeById = async (req, res) => {
  const { id } = req.params;

    try {
        const income = await Income.findById(id);
        
        res.status(200).json(income);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getExpenseById = async (req, res) => {
  const { id } = req.params;

    try {
        const expense = await Expense.findById(id);
        
        res.status(200).json(expense);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteIncomebyId = async (req, res) => {
  const { id } = req.params;

  await Income.findByIdAndRemove(id);

  res.json({ message: "Income deleted successfully." });
}

export const deleteExpensebyId = async (req, res) => {
  const { id } = req.params;

  await Expense.findByIdAndRemove(id);

  res.json({ message: "Expense deleted successfully." });
}

export const getExpenseDataById = async (req, res) => {
    const { id } = req.params
    const d = new Date();
    const day = d.getDate() 
    const m = d.getMonth() + 1;
    const oneJan = new Date(d.getFullYear(),0,1);
    const numberOfDays = Math.floor((d - oneJan) / (24 * 60 * 60 * 1000));
    const result = Math.ceil(( d.getDay() + 1 + numberOfDays) / 7);

    try {
        const ExpenseData = await Expense.aggregate([
          {
            $match: {
              username: id
            }
          }
        ])
       
        const sum = await Expense.aggregate([
            {
              $match: {
                'username': id
              }
            },{   
                $group: {
                  _id: null,
                  total: {
                    $sum: "$amount"
                  }
                }
            }, 
        ])

        const byClothes = await Expense.aggregate([
            {
              '$match': {
                'username': id,
                'category': 'Clothes'
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ])

        const byEntertainment = await Expense.aggregate([
            {
              '$match': {
                'username': id,
                'category': 'Entertainment'
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ])

        const byShopping = await Expense.aggregate([
            {
              '$match': {
                'username': id,
                'category': 'Shopping'
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ])

        const byTravel = await Expense.aggregate([
            {
              '$match': {
                'username': id,
                'category': 'Travel'
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ])

        const byGifts = await Expense.aggregate([
            {
              '$match': {
                'username': id,
                'category': 'Gifts'
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ])

        const byUtilities = await Expense.aggregate([
            {
              '$match': {
                'username': id,
                'category': 'Utilities'
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ])

        const byGeneral = await Expense.aggregate([
            {
              '$match': {
                'username': id,
                'category': 'General'
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ])

        const byOther = await Expense.aggregate([
            {
              '$match': {
                'username': id,
                'category': 'Other'
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ])

        const byKids = await Expense.aggregate([
            {
              '$match': {
                'username': id,
                'category': 'Kids'
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ])

        const bySports = await Expense.aggregate([
            {
              '$match': {
                'username': id,
                'category': 'Sports'
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ])

        const expenseDateDataMonth = await Expense.aggregate(
          [
            {
              '$project': {
                'createdAtWeek': {
                  '$week': '$date'
                }, 
                'createdAtMonth': {
                  '$month': '$date'
                }, 
                'amount': 1
              }
            }, {
              '$group': {
                '_id': '$createdAtWeek', 
                'totalSum': {
                  '$sum': '$amount'
                }, 
                'month': {
                  '$first': '$createdAtMonth'
                }
              }
            }, {
              '$match': {
                'username': id,
                'month': m
              }
            }, {
              '$group': {
                '_id': null, 
                'totalAmount': {
                  '$sum': '$totalSum'
                }
              }
            }
          ]
        )
        
        const expenseDateDataWeek = await Expense.aggregate(
          [
            {
              '$project': {
                'createdAtWeek': {
                  '$week': '$date'
                }, 
                'createdAtMonth': {
                  '$month': '$date'
                }, 
                'amount': 1
              }
            }, {
              '$group': {
                '_id': '$createdAtWeek', 
                'totalAmount': {
                  '$sum': '$amount'
                }, 
                'week': {
                  '$first': '$createdAtWeek'
                }
              }
            }, {
              '$match': {
                'username': id,
                'week': result - 1
              }
            }
          ]
        )

        const expenseDateDataDay = await Expense.aggregate(
          [
            {
              '$project': {
                'createdAtMonth': {
                  '$month': '$date'
                }, 
                'createdAtDay': {
                  '$dayOfMonth': '$date'
                }, 
                'amount': 1
              }
            }, {
              '$group': {
                '_id': '$createdAtDay', 
                'totalAmount': {
                  '$sum': '$amount'
                }, 
                'month': {
                  '$first': '$createdAtMonth'
                }, 
                'day': {
                  '$first': '$createdAtDay'
                }
              }
            }, {
              '$match': {
                'username': id,
                'month': m, 
                'day': day
              }
            }
          ]
        )

        const expense = {
            expensedata: ExpenseData, 
            sum: sum, 
            entertainment: byEntertainment, 
            shopping: byShopping,
            sports: bySports,
            kids: byKids,
            other: byOther,
            general: byGeneral,
            utilities: byUtilities,
            gifts: byGifts,
            travel: byTravel,
            clothes: byClothes,
            expenseDateDataMonth: expenseDateDataMonth,
            expenseDateDataWeek: expenseDateDataWeek,
            expenseDateDataDay: expenseDateDataDay
        }
        res.status(200).json(expense)
    } catch (error) {
        console.log(error.message)
    }
}

export const getIncomeDataById = async (req, res) => {
  const { id } = req.params
  const d = new Date();
  const day = d.getDate() 
  const m = d.getMonth() + 1;
  const oneJan = new Date(d.getFullYear(),0,1);
  const numberOfDays = Math.floor((d - oneJan) / (24 * 60 * 60 * 1000));
  const result = Math.ceil(( d.getDay() + 1 + numberOfDays) / 7);

    try {
        const IncomeData = await Income.aggregate([
          {
            $match: {
              username: id
            }
          }
        ])
    
        
        const sum = await Income.aggregate([
          {
            $match: {
              'username': id
            }
          }, {   
                $group: {
                  _id: null,
                  total: {
                    $sum: "$amount"
                  }
                },
            },
 
        ])
        
        const bySalary = await Income.aggregate([
            {
              '$match': {
                'username': id,
                'category': 'Salary'
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ])

        const byInvestment = await Income.aggregate([
            {
              '$match': {
                'username': id,
                'category': 'Investment'
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ])

        const byStocks = await Income.aggregate([
            {
              '$match': {
                'username': id,
                'category': 'Stocks'
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ])

        const byBusiness = await Income.aggregate([
            {
              '$match': {
                'username': id,
                'category': 'Business'
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ])

        const byOther = await Income.aggregate([
            {
              '$match': {
                'username': id,
                'category': 'Other'
              }
            }, {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': '$amount'
                }
              }
            }
          ])

          const incomeDateDataMonth = await Income.aggregate(
            [
              {
                '$match': {
                  'username': id
                }
              }, {
                '$project': {
                  'createdAtWeek': {
                    '$week': '$date'
                  }, 
                  'createdAtMonth': {
                    '$month': '$date'
                  }, 
                  'amount': 1
                }
              }, {
                '$group': {
                  '_id': '$createdAtWeek', 
                  'totalSum': {
                    '$sum': '$amount'
                  }, 
                  'month': {
                    '$first': '$createdAtMonth'
                  }
                }
              }, {
                '$match': {
                  'month': m
                }
              }, {
                '$group': {
                  '_id': null, 
                  'totalAmount': {
                    '$sum': '$totalSum'
                  }
                }
              }
            ]
          )
          
          const incomeDateDataWeek = await Income.aggregate(
            [
              {
                '$match': {
                  'username': id
                }
              }, {
                '$project': {
                  'createdAtWeek': {
                    '$week': '$date'
                  }, 
                  'createdAtMonth': {
                    '$month': '$date'
                  }, 
                  'amount': 1
                }
              }, {
                '$group': {
                  '_id': '$createdAtWeek', 
                  'totalAmount': {
                    '$sum': '$amount'
                  }, 
                  'week': {
                    '$first': '$createdAtWeek'
                  }
                }
              }, {
                '$match': {
                  'week': result - 1
                }
              }
            ]
          )
  
          const incomeDateDataDay = await Income.aggregate(
            [
              {
                '$match': {
                  'username': id
                }
              }, {
                '$project': {
                  'createdAtMonth': {
                    '$month': '$date'
                  }, 
                  'createdAtDay': {
                    '$dayOfMonth': '$date'
                  }, 
                  'amount': 1
                }
              }, {
                '$group': {
                  '_id': '$createdAtDay', 
                  'totalAmount': {
                    '$sum': '$amount'
                  }, 
                  'month': {
                    '$first': '$createdAtMonth'
                  }, 
                  'day': {
                    '$first': '$createdAtDay'
                  }
                }
              }, {
                '$match': {
                  'month': m, 
                  'day': day
                }
              }
            ]
          )

        const income = {
          incomedata: IncomeData, 
          sum: sum, 
          salary: bySalary, 
          investment: byInvestment, 
          other: byOther,
          business: byBusiness,
          stocks: byStocks,
          incomeDateDataMonth: incomeDateDataMonth,
          incomeDateDataWeek: incomeDateDataWeek,
          incomeDateDataDay: incomeDateDataDay
        }
        res.status(200).json(income)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const addIncomeDataById = async (req, res) => {
  const { name, category, amount, date, username } = req.body;
  const { id } = req.params

  const newIncome = new Income({ name, category, amount, date, username: id })

  try {
    await newIncome.save();

    res.status(201).json(newIncome);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const addExpenseDataById = async (req, res) => {
    const { name, category, amount, date, username } = req.body;
    const { id } = req.params

    const newExpense = new Expense({ name, category, amount, date, username: id })

    try {
        await newExpense.save();

        res.status(201).json(newExpense);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
