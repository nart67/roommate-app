import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createTask } from '../../actions/orm';
import { addList } from '../../actions/lists';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import './ViewTaskList.css';
import AddTask from './components/AddTask';
import socket from '../../socket/socket'

class ViewTaskList extends Component {    
    constructor(props) {
        super(props);
        this.list_id = props.match.params.id;
        this.getTasks = this.getTasks.bind(this);
        props.lists[this.list_id] || this.getTasks();
    }

    getTasks() {
        fetch(`/lists/${this.list_id}/tasks`, {credentials: 'same-origin'})
        .then(response => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
              return response.json();
            }
        }).then(data => {
            if (data) {
                this.props.dispatch(addList(this.list_id));
                for (let i = 0; i < data.tasks.length; i++) {
                    const task = data.tasks[i];
                    this.props.dispatch(createTask(task));
                }
                this.connectSocket();
            }
        });
    }

    connectSocket = () => {
        const self = this;
        socket.emit('subscribe', '5add0c6967a0e81a6c65e9ee');
        socket.on('task', function(data) {
            console.log(data);
            switch (data.type) {
            case 'ADD':
                console.log('test');
                self.props.dispatch(createTask(data.task));
                break;
            default:
                break;
            }
        });
    }

    render() {
        return (
          <div className='task-list'>
            <Grid container justify='center' spacing={16}>
                <Grid item xs={12} sm={8}>
                    <AddTask list={this.list_id} />
                </Grid>
                <Grid item xs={12} sm={8}>
                <Paper rounded='false'>
                    <ul>
                    {this.props.lists[this.list_id] ? 
                    this.props.Task.items.map((id) => 
                        this.props.Task.itemsById[id]
                    ).filter((task) =>
                        task.task_list === this.list_id
                    ).map((task) =>
                        <li className='task' key={task.id}>{task.title}</li>
                    ) :
                    null}
                    </ul>
                </Paper>
                </Grid>
            </Grid>
          </div>
        );
    }
}

const mapStateToProps = state => ({
    lists: state.lists,
    Task: state.orm.Task
  });

export default connect(mapStateToProps)(ViewTaskList);