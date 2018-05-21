import {fk, attr, Model} from 'redux-orm';

export class Task extends Model {
    static reducer(action, Task, session) {
        switch (action.type) {
        case 'CREATE_TASK':
            Task.create(action.payload);
            break;
        case 'UPDATE_TASK':
            Task.withId(action.payload.id).update(action.payload);
            break;
        case 'REMOVE_TASK':
            Task.withId(action.payload.id).delete();
            break;
        default:
            break;
        }
    }
}
Task.modelName = 'Task';

Task.fields = {
    id: attr(),
    title: attr(),
    task_list: fk('TaskList', 'tasks'),
    description: attr(),
    date_added: attr(),
    date_due: attr()
}