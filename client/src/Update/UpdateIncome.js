import React, { useContext, useEffect, useState } from 'react'
import { ModalBody, ModalFooter, ModalHeader, ModalContent, ModalOverlay, Modal, 
useDisclosure, Button, FormControl, FormLabel, Input, NumberInput, NumberInputField,
Tabs, TabList, Tab, Select } from '@chakra-ui/react'
import axios from 'axios'
import { MyContext } from '../useContext'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { EditIcon } from '@chakra-ui/icons'
import 'react-day-picker/lib/style.css';
import moment from 'moment'

const UpdateIncome = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { transactionName, category, amount, tab, onDateChange, handleSetCategory, 
    handleSetAmount, handleSetTransaction, handleSetTab, handleOnSubmit, startDate } = useContext(MyContext)
    const [income, setIncome] = useState([])

      useEffect(() => {
        try {
          axios.get(`https://expense-tracker221.herokuapp.com/transactions/income/${props.id}`)
          .then(res => setIncome(res.data))
  
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
        axios.patch(`https://expense-tracker221.herokuapp.com/transactions/income/${props.id}`, newTransactionData)
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
                  <Tab onClick={handleSetTab} value='Income'>Income</Tab>
                </TabList>
              </Tabs>
            </ModalHeader>

            <ModalBody>
              <form onSubmit={handleOnSubmit}>
                <FormControl>
                  <FormLabel>Name of {tab}</FormLabel>
                  <Input placeholder={income.name} 
                  value={transactionName} onChange={handleSetTransaction} variant="flushed"/>
                </FormControl>

                <FormControl>
                  <FormLabel>Category</FormLabel>
                  <Select value={category} onChange={handleSetCategory} 
                  placeholder={`Original Category: ${income.category}`}>
                    <option value='Salary'>Salary</option>
                    <option value='Investment'>Investment</option>
                    <option value='Stocks'>Stocks</option>
                    <option value='Business'>Business</option>
                    <option value='Other'>Other</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Amount</FormLabel>
                  <NumberInput defaultValue={parseInt(income.amount)}>
                    <NumberInputField 
                    onChange={handleSetAmount} variant="flushed"/>
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <FormLabel>Date</FormLabel>
                  <DayPickerInput placeholder={moment(income.date).format('YYYY-MM-D')}
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

export default UpdateIncome