import React, { useContext } from 'react'
import { ModalBody, ModalCloseButton, ModalFooter, ModalHeader, ModalContent, ModalOverlay,
Modal, useDisclosure, Button, FormControl, FormLabel, Input, NumberInput, NumberInputField,
Tabs, TabList, Tab, Select } from '@chakra-ui/react'
import { MyContext } from './useContext'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css';

const AddExpense = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { transactionName, category, amount, tab, onDateChange, handleSetCategory, 
    handleSetAmount, handleSetTransaction, handleSetTab, handleOnSubmit } = useContext(MyContext)

    return (
      <>
        <Button onClick={onOpen} colorScheme='green' variant='outline'>Add Income/Expense</Button>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>

          <ModalOverlay />

          <ModalContent>
            <ModalHeader>
              <Tabs isFitted variant='enclosed'>
                <TabList>
                  <Tab onClick={handleSetTab} value='Income'>Income</Tab>
                  <Tab value='Expense' onClick={handleSetTab}>Expense</Tab>
                </TabList>
              </Tabs>
            </ModalHeader>

            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleOnSubmit}>
                <FormControl>
                  <FormLabel>Name of {tab}</FormLabel>
                  <Input placeholder='Ex. job, clothes, birthday party, new shoes' 
                  value={transactionName} onChange={handleSetTransaction} variant="flushed"/>
                </FormControl>

                <FormControl>
                  <FormLabel>Category</FormLabel>
                  {tab === 'Expense' ?
                  <Select value={category} onChange={handleSetCategory} placeholder='Select an Expense'>
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
                  : 
                  <Select value={category} onChange={handleSetCategory} placeholder='Select an Income'>
                    <option value='Salary'>Salary</option>
                    <option value='Investment'>Investment</option>
                    <option value='Stocks'>Stocks</option>
                    <option value='Business'>Business</option>
                    <option value='Other'>Other</option>
                  </Select>
                  }
                </FormControl>

                <FormControl>
                  <FormLabel>Amount</FormLabel>
                  <NumberInput defaultValue={0}>
                    <NumberInputField value={amount} onChange={handleSetAmount} variant="flushed"/>
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <FormLabel>Date</FormLabel>
                  <DayPickerInput onDayChange={(day) => onDateChange(day)} />
                </FormControl>

                <ModalFooter>
                  <Button onClick={handleOnSubmit} onDoubleClick={onClose}>
                    Add {tab}
                  </Button>
                </ModalFooter>
              </form>

            </ModalBody>
          </ModalContent>

        </Modal>

      </>
    )
}

export default AddExpense
