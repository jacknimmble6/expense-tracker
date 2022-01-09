import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Box, Badge, Text } from '@chakra-ui/react'
import UpdateExpense from '../Update/UpdateExpense'
import DeleteExpense from '../Delete/DeleteExpense'

const ExpenseList = () => {
    const [expenseList, setExpenseList] = useState([])

    useEffect(() => {
        try {
          axios.get(`https://expense-tracker221.herokuapp.com/transactions/user/expense/${sessionStorage.getItem('token')}`)
          .then(res => setExpenseList(res.data.expensedata))

        } catch (error) {
          console.log(error)  
        }

    }, [])

    return (
        <div>
          <Box mt={12} ml={-4}>
          <Text textDecoration='underline' fontSize={30} ml={425}>
            Income List (Number of Expenses: {expenseList.length})
          </Text>
          <Box display="flex" flexDirection='row' flexWrap='wrap'>
          {expenseList.map(item => (
            <Box borderRadius='lg' backgroundColor='rgba(255, 31, 31, 0.8)' ml={35} w={220} mt={4} h={95}>
              <Badge borderRadius='full' px='2' colorScheme='yellow' mt={-2}>
                Expense
              </Badge>

              <Box ml={2}>
                Name: {item.name}
              </Box>

              <Box fontSize={14} ml={2}>
                Amount: ${item.amount}
              </Box>

              <Box fontSize={14} ml={2} mr={29} mt={0}>
                Category: {item.category}
              </Box>

              <Box mt={-91} ml={112} fontSize={14}>
                Date: {moment(item.date).format('L')}
              </Box>

              <Box mt={2} ml={2}>
                <UpdateExpense id={item._id} />
              </Box>

              <Box ml={198} mt={4}>
                <DeleteExpense id={item._id} />
              </Box>
            </Box>
          ))}
          </Box>
          </Box>
        </div>
    )
}

export default ExpenseList
