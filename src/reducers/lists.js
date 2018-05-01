const lists = (state = {}, action) => {
    switch (action.type) {
      case 'ADD_LIST':
        console.log('test');
        return {
          ...state,
          [action.id]: 'something'
        };
      default:
        return state
    }
  }
  
  export default lists