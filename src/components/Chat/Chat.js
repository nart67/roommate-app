import React, { Component } from 'react';
import MessagesList from './components/MessagesList';
import AddMessage from './components/AddMessage';
import './Chat.css';

const Chat = () => (
    <div id="container">
    {/* <Sidebar /> */}
    <section id="main">
        <MessagesList />
        <AddMessage />
    </section>
    </div>
)

export default Chat;