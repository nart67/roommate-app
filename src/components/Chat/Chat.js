import React, { Component } from 'react';
import MessagesList from './components/MessagesList';
import AddMessage from './components/AddMessage';
import './Chat.css';
import Paper from 'material-ui/Paper';
import socket from '../../socket/socket';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.room = props.match.params.id;
        this.joinChat(this.room);
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.room) {
            const nextRoom = nextProps.match.params.id;
            this.joinChat(nextRoom, this.room);
            this.room = nextProps.match.params.id;
        }
    }

    joinChat(room, prevRoom) {
        if (prevRoom) socket.emit('leave chat', prevRoom);
        socket.emit('join chat', room);
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

export default Chat;