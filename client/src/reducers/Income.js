const initialState = {
    salary: 0,
    investment: 0,
    stocks: 0,
    business: 0,
    other: 0
  }
  // eslint-disable-next-line
  export default (state = initialState, action) => {
    switch(action.type) {
      case 'addIncome':
        return {
          salary: action.payload.salary,
          investment: action.payload.investment,
          business: action.payload.business,
          stocks: action.payload.stocks,
          other: action.payload.other,
        }
      default:
        return state    
    }
}