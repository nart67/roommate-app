import {fk, many, attr, Model} from 'redux-orm';

export class TaskList extends Model {
    // Declare any static or instance methods you need.
    static reducer(action, TaskList, session) {
        switch (action.type) {
        case 'CREATE_LIST':
            TaskList.create(action.payload);
            break;
        case 'UPDATE_LIST':
            TaskList.withId(action.payload.id).update(action.payload);
            break;
        case 'REMOVE_LIST':
            TaskList.withId(action.payload.id).delete();
            break;
        case 'ADD_TASK_TO_LIST':
            TaskList.withId(action.payload.list).tasks.add(action.payload.task);
            break;
        case 'REMOVE_TASK_FROM_LIST':
            TaskList.withId(action.payload.list).tasks.remove(action.payload.task);
            break;
        default:
            break;
        }
    }
}
TaskList.modelName = 'TaskList';

// Declare your related fields.
TaskList.fields = {
    id: attr(),
    displayName: attr(),
    group: fk('Group')
};