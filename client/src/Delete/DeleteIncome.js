import React, { useEffect, useState } from 'react'
import { Modal, ModalOverlay, ModalContent, Button, ModalBody, ModalFooter, 
useDisclosure, ModalHeader, Text } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import axios from 'axios'
import moment from 'moment'

const DeleteIncome = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [income, setIncome] = useState([])

  useEffect(() => {
    try {
      axios.get(`https://expense-tracker221.herokuapp.com/transactions/income/${props.id}`)
      .then(res => setIncome(res.data))

    } catch (error) {
      console.log(error)  
    }
  }, [props.id])

  const deleteIncome2 = () => {
    axios.delete(`https://expense-tracker221.herokuapp.com/transactions/income/${props.id}`)
  }

  return (
    <>
      <DeleteIcon onClick={onOpen} />

      <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom' >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>
            <Text color='red'>  
              Delete {income.name}?
            </Text>
          </ModalHeader>

          <ModalBody>
            <Text>
              Name: {income.name}
            </Text>
            <Text>
              Category: {income.category}
            </Text>
            <Text>
              Amount: ${income.amount}
            </Text>
            <Text>
              Date: {moment(income.date).format('L')}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={deleteIncome2}>
              Delete
            </Button>
            <Button variant='ghost' onClick={onClose}>Close</Button>
          </ModalFooter> 
        </ModalContent>

      </Modal>
    </>
  )
}

export default DeleteIncome
