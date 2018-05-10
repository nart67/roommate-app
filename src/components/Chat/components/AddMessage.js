import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addMessage } from '../../../actions/messages'
import socket from '../../../socket/socket';

const AddMessage = (props) => {
  let input

  return (
    <section id="new-message">
      <input
        onKeyPress={(e) => {
        if (e.key === 'Enter') {
          props.dispatch(input.value, 'Me', props.room)
          input.value = ''
        }
      }}
        type="text"
        ref={(node) => {
        input = node
      }}
      />
    </section>
  )
}

AddMessage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  dispatch: (message, user, room) => {
    socket.emit('send', {
      message,
      user,
      room
    })
    dispatch(addMessage(message, user))
  }
})
export default connect(() => {return {}}, mapDispatchToProps)(AddMessage);
