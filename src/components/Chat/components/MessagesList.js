import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Message from './Message'
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

class MessagesList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    const messageList = this.node;
    const scrollHeight = messageList.scrollHeight;
    const height = messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  render() {
    const { messages } = this.props;
    return (
      <section id="messages-list" ref={(node) => { this.node = node } } >
        <ul>
          {messages.map(message => (
            <Message
              key={message.id}
              {...message}
            />
        ))}
        </ul>
      </section>
    );
  }
}

MessagesList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired
  }).isRequired).isRequired
}

const mapStateToProps = state => ({
  messages: state.messages
});

export default connect(mapStateToProps)(MessagesList);
