const initialState = {
      entertainment: 0,
      shopping: 0,
      gifts: 0,
      kids: 0,
      general: 0,
      travel: 0,
      utilities: 0,
      clothes: 0,
      sports: 0,
      other: 0
}
  // eslint-disable-next-line
  export default (state = initialState, action) => {
    switch(action.type) {
      case 'addExpense':
        return {
          entertainment: action.payload.entertainment,
          shopping: action.payload.shopping,
          gifts: action.payload.gifts,
          kids: action.payload.kids,
          general: action.payload.general,
          travel: action.payload.travel,
          utilities: action.payload.utilities,
          clothes: action.payload.clothes,
          sports: action.payload.sports,
          other1: action.payload.other1
        }
      default:
        return state    
    }
}