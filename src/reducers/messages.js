const messages = (state = [], action) => {
    switch (action.type) {
      case 'ADD_MESSAGE':
      case 'MESSAGE_RECEIVED':
        return state.concat([
          {
            message: action.message,
            user: action.user,
            id: action.id
          }
        ])
      case 'CLEAR_MESSAGES':
        return [];
      default:
        return state
    }
  }
  
  export default messages
  