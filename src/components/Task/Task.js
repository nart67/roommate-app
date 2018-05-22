import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const styles = theme => ({
    root: {
        position: 'relative',
    },
    button: {
      position: 'absolute',
      right: '10px',
    },
  });

class Task extends Component {
    
    delete = () => {
        fetch(`/api/groups/${this.props.group}/lists/${this.props.list}` +
            `/tasks/${this.props.task}`, {
          credentials: 'same-origin',
          method: 'DELETE',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
          })
        })
        .then(response => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
              return response.json();
            }
        }).then(data => {
            console.log(data);
        });
    }

    onCheck = (event) => {
        const task = Object.assign({}, this.props.Task.itemsById[this.props.task]);
        task.completed = event.target.checked;
        const data = new URLSearchParams();
        data.append('task', JSON.stringify(task));

        fetch(`/api/groups/${this.props.group}/lists/${this.props.list}` +
            `/tasks/${this.props.task}`, {
          body: data,
          credentials: 'same-origin',
          method: 'PUT',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
          })
        })
        .then(response => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
            return response.json();
            }
        }).then(data => {
            console.log(data);
        });
    }

    render() {
        const task = this.props.Task.itemsById[this.props.task];
        const { classes } = this.props;
        return (
        <li>
            <div className={classes.root}>
            <Checkbox
              checked={task.completed}
              onChange={this.onCheck}
            />
            {task.title}
            <IconButton 
              className={classes.button} 
              aria-label="Delete"
              onClick={this.delete}
            >
                <DeleteIcon />
            </IconButton>
            </div>
        </li>
    )};
}

Task.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
const mapStateToProps = state => ({
    Task: state.orm.Task
  });

export default withStyles(styles)(connect(mapStateToProps)(Task));
  