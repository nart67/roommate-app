let nextMessageId = 0

export const addMessage = (message, user) => ({
  type: 'ADD_MESSAGE',
  id: nextMessageId++,
  message,
  user
})

export const messageReceived = (message, user) => ({
  type: 'MESSAGE_RECEIVED',
  id: nextMessageId++,
  message,
  user
})

export const populateUsersList = users => ({
  type: 'USERS_LIST',
  users
})

export const clearMessages = () => {
  nextMessageId = 0;
  return ({
    type: 'CLEAR_MESSAGES'
  })
}