import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createTask, removeTask, updateTask } from '../../actions/orm';
import { addList } from '../../actions/lists';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import './ViewTaskList.css';
import AddTask from './components/AddTask';
import socket from '../../socket/socket';
import Task from './components/Task';

class ViewTaskList extends Component {    
    constructor(props) {
        super(props);
        this.list_id = props.match.params.id;
        props.lists[this.list_id] || this.getTasks();
    }

    componentWillReceiveProps(nextProps){
        const list = this.props.List.itemsById[this.list_id];
        if (list) {
            this.group_id = list.group;
            this.connectSocket();
            this.componentWillReceiveProps = null;
        }
     }
     
    getTasks = () => {
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
            }
        });
    }

    connectSocket = () => {
        const self = this;
        socket.emit('subscribe', this.group_id);
        socket.on('task', function(data) {
            console.log(data);
            switch (data.type) {
            case 'ADD':
                self.props.dispatch(createTask(data.task));
                break;
            case 'DELETE':
                self.props.dispatch(removeTask(data.task));
                break;
            case 'UPDATE':
                self.props.dispatch(updateTask(data.task));
                break;
            default:
                break;
            }
        });
    }

    render() {
        return (
          <div className='task-list'>
          {this.group_id &&
            <Grid container justify='center' spacing={16}>
                <Grid item xs={12} sm={8}>
                    <AddTask list={this.list_id} group={this.group_id} />
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
                        <Task key={task.id} task={task.id}
                        list={this.list_id} group={this.group_id} />
                    ) :
                    null}
                    </ul>
                </Paper>
                </Grid>
            </Grid>
          }
          </div>
        );
    }
}

const mapStateToProps = state => ({
    lists: state.lists,
    List: state.orm.TaskList,
    Task: state.orm.Task
  });

export default connect(mapStateToProps)(ViewTaskList);