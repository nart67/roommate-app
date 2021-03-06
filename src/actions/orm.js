// List actions
export const ListActions = {
    createList: (payload) => ({
        type: 'CREATE_LIST',
        payload
    }),
    removeList: (payload) => ({
        type: 'REMOVE_LIST',
        payload
    }),
    updateList: (payload) => ({
        type: 'UPDATE_LIST',
        payload
    })
}

// Channel actions
export const ChannelActions = {
    createChannel: (payload) => ({
        type: 'CREATE_CHANNEL',
        payload
    }),
    removeChannel: (payload) => ({
        type: 'REMOVE_CHANNEL',
        payload
    }),
    updateChannel: (payload) => ({
        type: 'UPDATE_CHANNEL',
        payload
    })
}

// Task actions
export const createTask = (payload) => ({
    type: 'CREATE_TASK',
    payload
})

export const removeTask = (payload) => ({
    type: 'REMOVE_TASK',
    payload
})

export const updateTask = (payload) => ({
    type: 'UPDATE_TASK',
    payload
})

// User actions
export const createUser = (payload) => ({
    type: 'CREATE_USER',
    payload
})

// Group actions
export const GroupActions = {
    createGroup: (payload) => ({
        type: 'CREATE_GROUP',
        payload
    }),
    
    addList: (payload) => ({
        type: 'ADD_LIST_TO_GROUP',
        payload
    }),
    
    removeList: (payload) => ({
        type: 'REMOVE_LIST_FROM_GROUP',
        payload
    }),

    addChannel: (payload) => ({
        type: 'ADD_CHANNEL_TO_GROUP',
        payload
    }),
    
    removeChannel: (payload) => ({
        type: 'REMOVE_CHANNEL_FROM_GROUP',
        payload
    })
}
