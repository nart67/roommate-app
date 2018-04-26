import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addList } from '../../actions/lists';

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
            this.props.lists[this.list_id] ? this.props.lists[this.list_id].map((task) => 
                <p>{task.title}</p>
            ) :
            null
        );
    }
}

const mapStateToProps = state => ({
    lists: state.lists
  });

export default connect(mapStateToProps)(ViewTaskList);