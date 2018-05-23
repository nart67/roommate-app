const initial = {
    fetched: false,
    invites: []
}

const invites = (state = initial, action) => {
    switch (action.type) {
      case 'INVITE_RECEIVED':
        return Object.assign({}, state, {
            invites: state.invites.concat([
                {
                    ...action.invite
                }
            ])
        });
      case 'INVITE_REMOVED':
        return Object.assign({}, state, {
            invites: state.invites.filter((invite) => invite.id !== action.id)
        });
      case 'INVITES_FETCHED':
        return Object.assign({}, state, {
            fetched: true
        });
      case 'LOGOUT':
      case 'CLEAR_INVITES':
        return initial;
      default:
        return state;
    }
  }
  
  export default invites;
  