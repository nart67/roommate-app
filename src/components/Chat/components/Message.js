import React from 'react'
import PropTypes from 'prop-types'

const Message = ({ message, user }) => (
    <div className='message-container'>
      <b>{user}</b>: {message}
    </div>
)

Message.propTypes = {
  message: PropTypes.string.isRequired,
  user: PropTypes.string
}

export default Message
