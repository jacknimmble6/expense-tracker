import React from 'react'
import { Box, Link, Button } from '@chakra-ui/react'

const Navbar = () => {
    const logout = () => {
      sessionStorage.removeItem('token')
    }

    return (
      <Box>
        <Link href='/' marginLeft='200px'>Home</Link>  

        <Link href='/signup' marginLeft='250px' marginTop='-20px'>
          Sign Up
        </Link> 
          
        <Button onClick={logout} marginLeft='300px' variant='ghost'>
          Log Out
        </Button>
      </Box>
    )
}

export default Navbar
