import React from 'react'
import Navbar from './Navbar/Navbar'
import Home from './Home'
import ExpenseList from './ExpenseList/ExpenseList'
import IncomeList from './ExpenseList/IncomeList'
import TotalList from './ExpenseList/TotalList'
import Signup from './Sign Up/signup'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  const auth2 = sessionStorage.getItem('token')

  return (
    <Router>
      <Navbar />
      <Routes>
        {auth2 ? (
          <>
            <Route path='/' element={<Home />} />
            <Route path='/expense' element={<ExpenseList />} />
            <Route path='/income' element={<IncomeList />} />
            <Route path='both' element={<TotalList />} />
            <Route path='/signup' element={<Signup />} />
          </>
        ) : (
        <Route path='/signup' element={<Signup />} />
        )}
      </Routes> 
    </Router>
  )
}

export default App
