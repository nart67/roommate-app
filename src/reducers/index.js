import { combineReducers } from 'redux'
import auth from './auth'
import { reduxReducer as orm } from '../orm/models';

export default combineReducers({
  auth,
  orm
})
