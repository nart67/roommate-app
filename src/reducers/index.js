import { combineReducers } from 'redux';
import auth from './auth';
import { reduxReducer as orm } from '../orm/models';
import lists from './lists';
import messages from './messages';
import invites from'./invites';

export default combineReducers({
  auth,
  orm,
  lists,
  messages,
  invites
})
