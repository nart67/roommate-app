import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addList } from '../../actions/lists';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import './ViewTaskList.css';

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
            data && this.props.dispatch(addList(this.list_id, data.tasks));
        });
    }

    render() {
        return (
          <div className='task-list'>
            <Grid container justify='center' spacing={16}>
                <Grid item xs={12} sm={8}>
                <Paper rounded={false}>
                    <ul>
                    {this.props.lists[this.list_id] ? this.props.lists[this.list_id].map((task) => 
                        <li className='task'>{task.title}</li>
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
    lists: state.lists
  });

export default connect(mapStateToProps)(ViewTaskList);