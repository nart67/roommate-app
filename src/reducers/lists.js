const lists = (state = {}, action) => {
    switch (action.type) {
      case 'ADD_LIST':
        return {
          ...state,
          [action.id]: action.tasks
        };
      default:
        return state
    }
  }
  
  export default lists
  