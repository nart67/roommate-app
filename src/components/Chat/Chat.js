import React, { Component } from 'react';
import MessagesList from './components/MessagesList';
import AddMessage from './components/AddMessage';
import './Chat.css';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import socket from '../../socket/socket';
import { messageReceived, clearMessages } from '../../actions/messages';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.room = props.match.params.id;
        if (this.room !== socket.currentRoom) this.joinChat(this.room);
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.room) {
            const nextRoom = nextProps.match.params.id;
            this.joinChat(nextRoom, this.room);
            this.room = nextProps.match.params.id;
        }
    }

    joinChat = (room, prevRoom) => {
        if (prevRoom) socket.emit('leave chat', prevRoom);
        socket.emit('join chat', room);
        socket.currentRoom = room;
        this.props.clear();
        this.getMessages(room);
    }

    getMessages(room) {
        fetch(`/api/channels/${room}/messages`, {credentials: 'same-origin'})
        .then(response => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
              return response.json();
            }
        }).then(data => {
            if (!data) return;
            for (let i = 0; i < data.messages.length; i++) {
                const message = data.messages[i].message;
                const user = data.messages[i].user.displayName;
                this.props.addMessage(message, user);
            }
        });
    }

    render() {
        return (
        <div id="container">
        {/* <Sidebar /> */}
        <Paper>
        <section id="main">
            <MessagesList />
            <AddMessage room={this.room} />
        </section>
        </Paper>
        </div>
        )
    } 

} 
const mapDispatchToProps = dispatch => ({
    addMessage: (message, user) => {
      dispatch(messageReceived(message, user))
    },
    clear: () => dispatch(clearMessages())
  });
  export default connect(() => {return {}}, mapDispatchToProps)(Chat);