import { combineReducers } from 'redux'
import auth from './auth'
import lists from './lists'
import { reduxReducer as orm } from '../orm/models';

export default combineReducers({
  auth,
  lists,
  orm
})
