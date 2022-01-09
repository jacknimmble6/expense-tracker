import React, {useEffect, useState} from 'react'
import axios from 'axios'
import moment from 'moment'
import { Box, Badge, Text } from '@chakra-ui/react'
import UpdateIncome from '../Update/UpdateIncome'
import UpdateExpense from '../Update/UpdateExpense'
import DeleteIncome from '../Delete/DeleteIncome'
import DeleteExpense from '../Delete/DeleteExpense'

const TotalList = () => {
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

    }, [])
    
    return (
        <Box >
          <Text fontSize={30} ml={455}>
            All Transactions (Total Amount: {incomeList.length + expenseList.length})
          </Text>

            <Box display='flex' flexDirection='row' flexWrap='wrap'>
            {incomeList.map(item => (
              <Box borderRadius='lg' backgroundColor='lightgreen' ml={35} w={220} mt={4} h={95}>
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

          {expenseList.map(item => (
            <Box borderRadius='lg' backgroundColor='rgba(255, 31, 31, 0.8)' ml={35} w={220} mt={8} h={95}>
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
    )
}

export default TotalList
