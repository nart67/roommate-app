import {fk, many, attr, Model, ORM, createReducer} from 'redux-orm';
import {Group} from './models/Group';
import {Task} from './models/Task';
import {TaskList} from './models/TaskList';
import {User} from './models/User';
import {Channel} from './models/Channel';

export const orm = new ORM();
orm.register(Task, TaskList, Group, User, Channel);
export const reduxReducer = createReducer(orm);
