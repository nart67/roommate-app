import React, { Component } from 'react'

const Tasks = (props) => (
    <h1>{props.location.state.list}</h1>
);

export default Tasks;