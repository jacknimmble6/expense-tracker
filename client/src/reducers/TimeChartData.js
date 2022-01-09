const initialState = {
    dayData: 0,
    weekData: 0,
    monthData: 0
}
// eslint-disable-next-line
export default (state = initialState, action) => {
    switch (action.type) {
        case 'addData': 
          return {
            dayData: action.payload.dayData,
            weekData: action.payload.weekData,
            monthData: action.payload.monthData,
          }
        default:
          return state
    }
}