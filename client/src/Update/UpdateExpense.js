import React, { useContext, useState, useEffect } from 'react'
import { ModalBody, ModalFooter, ModalHeader, ModalContent, ModalOverlay,
Modal, useDisclosure, Button, FormControl, FormLabel, Input, NumberInput, NumberInputField,
Tabs, TabList, Tab, Select } from '@chakra-ui/react'
import { MyContext } from '../useContext'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { EditIcon } from '@chakra-ui/icons'
import 'react-day-picker/lib/style.css';
import axios from 'axios'
import moment from 'moment'

const UpdateExpense = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { transactionName, category, amount, tab, onDateChange, handleSetCategory, 
    handleSetAmount, handleSetTransaction, handleSetTab, handleOnSubmit, startDate } = useContext(MyContext)
    const [expense, setExpense] = useState([])

    useEffect(() => {
      try {
        axios.get(`https://expense-tracker221.herokuapp.com/transactions/expense/${props.id}`)
        .then(res => setExpense(res.data))

      } catch (error) {
        console.log(error)  
      }
    }, [props.id])

    const handleSubmit = () => {
      const newTransactionData = {
        name: transactionName,
        category: category,
        amount: amount,
        date: startDate
      }
      axios.patch(`https://expense-tracker221.herokuapp.com/transactions/expense/${props.id}`, newTransactionData)
    }
    
    return (
      <>
        <EditIcon ml={172} w={12} h={5} onClick={onOpen} />

        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>

          <ModalOverlay />

          <ModalContent>
            <ModalHeader>
              <Tabs isFitted variant='enclosed'>
                <TabList>
                  <Tab value='Expense' onClick={handleSetTab}>Edit Expense</Tab>
                </TabList>
              </Tabs>
            </ModalHeader>

            <ModalBody>
              <form onSubmit={handleOnSubmit}>
                <FormControl>
                  <FormLabel>Name of {tab}</FormLabel>
                  <Input placeholder={expense.name} 
                  value={transactionName} onChange={handleSetTransaction} variant="flushed"/>
                </FormControl>

                <FormControl>
                  <FormLabel>Category</FormLabel>
                  <Select value={category} onChange={handleSetCategory} 
                  placeholder={`Original Category: ${expense.category}`}>
                    <option value='Clothes'>Clothes</option>
                    <option value='Entertainment'>Entertainment</option>
                    <option value='Utilities'>Utilites</option>
                    <option value='General'>General</option>
                    <option value='Gifts'>Gifts</option>
                    <option value='Kids'>Kids</option>
                    <option value='Shopping'>Shopping</option>
                    <option value='Sports'>Sports</option>
                    <option value='Travel'>Travel</option>
                    <option value='Other'>Other</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Amount</FormLabel>
                  <NumberInput defaultValue={expense.amount}>
                    <NumberInputField value={amount} onChange={handleSetAmount} variant="flushed"/>
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <FormLabel>Date</FormLabel>
                  <DayPickerInput placeholder={moment(expense.date).format('YYYY-MM-D')}
                  onDayChange={(day) => onDateChange(day)} />
                </FormControl>

                <ModalFooter>
                  <Button onClick={handleSubmit}>
                    Update {tab}
                  </Button>
                  <Button onClick={onClose} ml={9}>
                    Close
                  </Button>
                </ModalFooter>
              </form>

            </ModalBody>
          </ModalContent>

        </Modal>

      </>
    )
}

export default UpdateExpense
