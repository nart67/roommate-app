import { combineReducers } from 'redux'
import auth from './auth'
import { reduxReducer as orm } from '../orm/models';
import lists from './lists'
import messages from './messages'

export default combineReducers({
  auth,
  orm,
  lists,
  messages
})
