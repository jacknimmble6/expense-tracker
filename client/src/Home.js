import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import Balance from './Balance/Balance'
import CategoryChart from './CategoryChart/CategoryChart'
import List from './ExpenseList/List'
import AddExpense from './AddExpense'
import TimeCharts from './TimeCharts'

const Home = () => {
  return (
    <>
    <AddExpense />
    
    <Grid h="600px" templateRows="repeat(2, 1fr)" templateColumns="repeat(4, 1fr)">
      
      <GridItem rowSpan={{ 'lg': 1, 'sm': 1 }} colSpan={{'lg': 2, 'sm': 4, 'md': 4 }} 
      h='300px' rowStart={1} rowEnd={{ 'sm': 4 }} backgroundColor='rgba(39, 188, 245, 0.32)'>
        <Balance h='400px'/>
      </GridItem>

      <GridItem colSpan={{ 'lg': 2, 'sm': 4, 'md': 4 }} rowSpan={{ 'lg': 1, 'sm': 1 }} 
      backgroundColor='rgba(245, 39, 145, 0.32)'>
        <CategoryChart />
      </GridItem>
      
      <GridItem colSpan={{'lg': 2, 'sm': 4, 'md': 4 }} rowSpan={{ 'lg': 1, 'sm': 1 }}>
        <List />
      </GridItem>
      
      <GridItem colSpan={{'lg': 2, 'sm': 4, 'md': 4}} rowSpan={{ 'lg': 1, 'sm': 1 }} bg="turquoise">
        <TimeCharts />
      </GridItem>

    </Grid>    
    </>
  )
}

export default Home
