export const inviteReceived = (invite) => ({
  type: 'INVITE_RECEIVED',
  invite: {...invite}
})

export const inviteRemoved = (id) => ({
  type: 'INVITE_REMOVED',
  id
})

export const fetched = () => ({
  type: 'INVITES_FETCHED'
})

export const clear = () => ({
    type: 'CLEAR_INVITES'
})
