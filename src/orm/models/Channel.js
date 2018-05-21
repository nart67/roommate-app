import {fk, attr, Model} from 'redux-orm';

export class Channel extends Model {
    // Declare any static or instance methods you need.
    static reducer(action, Channel, session) {
        switch (action.type) {
        case 'CREATE_CHANNEL':
            Channel.create(action.payload);
            break;
        case 'UPDATE_CHANNEL':
            Channel.withId(action.payload.id).update(action.payload);
            break;
        case 'REMOVE_CHANNEL':
            Channel.withId(action.payload.id).delete();
            break;
        case 'ADD_MESSAGE_TO_CHANNEL':
            Channel.withId(action.payload.channel).messages.add(action.payload.message);
            break;
        case 'REMOVE_MESSAGE_FROM_CHANNEL':
            Channel.withId(action.payload.channel).messages.remove(action.payload.message);
            break;
        default:
            break;
        }
    }
}
Channel.modelName = 'Channel';

// Declare your related fields.
Channel.fields = {
    id: attr(),
    displayName: attr(),
    group: fk('Group')
};