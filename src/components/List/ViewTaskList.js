import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createTask } from '../../actions/orm';
import { addList } from '../../actions/lists';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import './ViewTaskList.css';
import AddTask from '../Task/AddTask';
import socket from '../../socket/socket';
import Task from '../Task/Task';

class ViewTaskList extends Component {    
    constructor(props) {
        super(props);
        this.list_id = props.match.params.id;
        props.lists[this.list_id] || this.getTasks();
        const list = this.props.List.itemsById[this.list_id];
        if (list) {
            this.group_id = list.group;
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.match.params.id !== this.list_id) {
            this.list_id = nextProps.match.params.id;
            this.props.lists[this.list_id] || this.getTasks();
        }
        const list = this.props.List.itemsById[this.list_id];
        if (list) {
            this.group_id = list.group;
        }
     }
     
    getTasks = () => {
        fetch(`/api/lists/${this.list_id}/tasks`, {credentials: 'same-origin'})
        .then(response => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
              return response.json();
            }
        }).then(data => {
            if (data) {
                this.props.dispatch(addList(this.list_id));
                socket.lists[this.list_id] = true;
                for (let i = 0; i < data.tasks.length; i++) {
                    const task = data.tasks[i];
                    this.props.dispatch(createTask(task));
                }
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