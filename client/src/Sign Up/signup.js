import React, { useState } from 'react'
import { FormControl, FormLabel, Input, Box, Text, Button, 
InputGroup, InputRightElement, Icon } from '@chakra-ui/react'
import axios from 'axios'

const Signup = () => {
  const [phase, setPhase] = useState('Sign Up')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [displayPassword, setDisplayPassword] = useState(false);
  const handlePasswordVisibility = () => setDisplayPassword(!displayPassword);
  const [auth, setAuth] = useState()

  const onUsername = (e) => {
    setUsername(e.target.value)
  }

  const onPassword = (e) => {
    setPassword(e.target.value)
  }

  const onEmail = (e) => {
    setEmail(e.target.value)
  }

  const switchPhase = () => {
    if (phase === 'Sign Up') {
      setPhase('Log In')
    } else {
      setPhase('Sign Up')
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (phase === 'Sign Up') {
      axios.post('https://expense-tracker221.herokuapp.com/transactions/user/register', { username, password, email })
      .then(res => setAuth(res.data.token))
    } else {
      axios.post('https://expense-tracker221.herokuapp.com/transactions/user/login', { username, password, email })
      .then(res => setAuth(res.data.token))
    } 

    setUsername('')
    setEmail('')
    setPassword('')
  }

  sessionStorage.setItem('token', auth)

  return (
    <Box backgroundColor='#eaf4fc' mt={36} w={460} ml={400} h={312} borderRadius={30}>
      <Text fontSize={25} ml={173}>{phase}</Text>

      <FormControl isRequired>
        <FormLabel>Username</FormLabel>
        <Input size='md' borderColor='black' variant='flushed' onChange={onUsername} />
      </FormControl>

      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input size='md' borderColor='black' variant='flushed' onChange={onEmail} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel type={displayPassword ? 'text' : 'password'}>Password</FormLabel>
        <InputGroup>
          <Input size='md' borderColor='black' variant='flushed' onChange={onPassword} />
          <InputRightElement width="3rem">
            <Button h="1.5rem" size="sm" onClick={handlePasswordVisibility}>
              {displayPassword ? <Icon name="view-off" /> : <Icon name="view" />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button ml={172} onClick={onSubmit} position='absolute' variant='ghost' colorScheme='blue' mt={15}>
        {phase}
      </Button>

      <Button ml={371} mt={25} variant='ghost' colorScheme='blue' onClick={switchPhase}>
        {phase === 'Sign Up' ? 'Log In' : 'Sign Up'}
      </Button>
    </Box>
  )
}

export default Signup