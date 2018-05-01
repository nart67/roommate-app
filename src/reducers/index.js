import { combineReducers } from 'redux'
import auth from './auth'
import { reduxReducer as orm } from '../orm/models';
import lists from './lists'

export default combineReducers({
  auth,
  orm,
  lists
})
