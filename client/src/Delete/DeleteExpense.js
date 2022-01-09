import React, { useState, useEffect } from 'react'
import { Modal, ModalOverlay, ModalContent, Button, ModalBody, ModalFooter, 
useDisclosure, ModalHeader, Text } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import axios from 'axios'
import moment from 'moment'

const DeleteExpense = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [expense, setExpense] = useState([])
  
  useEffect(() => {
    try {
      axios.get(`https://expense-tracker221.herokuapp.com/transactions/expense/${props.id}`)
      .then(res => setExpense(res.data))

    } catch (error) {
      console.log(error)  
    }
  }, [props.id])

  const deleteExpense2 = () => {

    try {
      axios.delete(`https://expense-tracker221.herokuapp.com/transactions/expense/${props.id}`)

    } catch (error) {
      console.log(error.message)
    }
  }
  
  return (
    <>
      <DeleteIcon onClick={onOpen} />

      <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom' >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>
            <Text color='red'>  
              Delete {expense.name}?
            </Text>
          </ModalHeader>
  
          <ModalBody>
            <Text>
              Name: {expense.name}
            </Text>
            <Text>
              Category: {expense.category}
            </Text>
            <Text>
              Amount: ${expense.amount}
            </Text>
            <Text>
              Date: {moment(expense.date).format('L')}
            </Text>
          </ModalBody>
  
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={deleteExpense2}>
              Delete
            </Button>
            <Button variant='ghost' onClick={onClose}>Close</Button>
          </ModalFooter> 
        </ModalContent>
  
      </Modal>
    </>
  )
}

export default DeleteExpense