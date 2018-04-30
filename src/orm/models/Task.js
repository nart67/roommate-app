import {fk, many, attr, Model} from 'redux-orm';

export class Task extends Model {

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