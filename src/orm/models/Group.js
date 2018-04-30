import {fk, many, attr, Model} from 'redux-orm';

export class Group extends Model {
    // Declare any static or instance methods you need.
    static reducer(action, Group, session) {
        switch (action.type) {
        case 'CREATE_GROUP':
            Group.create(action.payload);
            break;
        case 'UPDATE_GROUP':
            Group.withId(action.payload.id).update(action.payload);
            break;
        case 'REMOVE_GROUP':
            Group.withId(action.payload.id).delete();
            break;
        default:
            break;
        }
    }
}
Group.modelName = 'Group';

// Declare your related fields.
Group.fields = {
    id: attr(),
    displayName: attr(),
    lists: many('TaskList')
};