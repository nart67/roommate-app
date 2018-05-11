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
        case 'ADD_LIST_TO_GROUP':
            Group.withId(action.payload.group).lists.add(action.payload.id);
            break;
        case 'REMOVE_LIST_FROM_GROUP':
            Group.withId(action.payload.group).lists.remove(action.payload.id);
            break;
        case 'ADD_CHANNEL_TO_GROUP':
            Group.withId(action.payload.group).channels.add(action.payload.id);
            break;
        case 'REMOVE_CHANNEL_FROM_GROUP':
            Group.withId(action.payload.group).channels.remove(action.payload.id);
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
    lists: many('TaskList'),
    channels: many('Channel')
};