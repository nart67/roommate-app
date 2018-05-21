import {many, attr, Model} from 'redux-orm';

export class User extends Model {
    // Declare any static or instance methods you need.
    static reducer(action, User, session) {
        switch (action.type) {
        case 'CREATE_USER':
            User.create(action.payload);
            break;
        case 'UPDATE_USER':
            User.withId(action.payload.id).update(action.payload);
            break;
        case 'REMOVE_USER':
            User.withId(action.payload.id).delete();
            break;
        default:
            break;
        }
    }
}
User.modelName = 'User';

// Declare your related fields.
User.fields = {
    id: attr(),
    displayName: attr(),
    groups: many('Group')
};