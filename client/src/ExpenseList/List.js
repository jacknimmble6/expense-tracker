import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Box, Badge, Text, Link } from '@chakra-ui/react'
import UpdateExpense from '../Update/UpdateExpense'
import UpdateIncome from '../Update/UpdateIncome'
import DeleteIncome from '../Delete/DeleteIncome'
import DeleteExpense from '../Delete/DeleteExpense'

const List = () => {
    const [incomeList, setIncomeList] = useState([])
    const [expenseList, setExpenseList] = useState([])

    useEffect(() => {
        try {
          axios.get(`https://expense-tracker221.herokuapp.com/transactions/user/expense/${sessionStorage.getItem('token')}`)
          .then(res => setExpenseList(res.data.expensedata))

          axios.get(`https://expense-tracker221.herokuapp.com/transactions/user/income/${sessionStorage.getItem('token')}`)
          .then(res => setIncomeList(res.data.incomedata))
        } catch (error) {
          console.log(error)  
        }

        return () => {
          setIncomeList([])
          setExpenseList([])
        }
    }, [])

    return (
        <>
          <Box key='1'>
          <Text textDecoration='underline' fontSize={30} ml={65}>
            <Link href='http://localhost:3000/income'>
              Income List
            </Link>
          </Text>
          {incomeList.slice(0, 2).map(item => (
            <Box borderRadius='lg' backgroundColor='lightgreen' position='absolute' 
            ml={35} w={220} mt={4} h={95}>
              <Badge borderRadius='full' px='2' colorScheme='teal' mt={-2}>
                Income
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
               
              <Box mt={12} ml={-4}>
                <UpdateIncome id={item._id} />
              </Box>

              <Box mb={52} mt={-6} ml={202}>
                <DeleteIncome id={item._id} />
              </Box>
            </Box>
          ))}
          </Box>

          <Box ml={330} mt={-222}>
          <Text textDecoration='underline' fontSize={30} ml={65} mt={177} position='absolute'>
            <Link href='http://localhost:3000/expense'>
              Expense List
            </Link>
          </Text>
          {expenseList.slice(0, 2).map(item => (
            <Box borderRadius='lg' backgroundColor='rgba(255, 31, 31, 0.8)' ml={35} 
             w={220} mt={234} h={95} position='absolute'>
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

          <Text fontSize={20} ml={-165} position='absolute' mt={447}>
            <Link color='teal.500' href='http://localhost:3000/both'>
              Click here to see all transactions.
            </Link>
          </Text>

          </Box>
        </>
    )
}

export default List
