import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

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
    constructor(props) {
        super(props);
    }
    
    delete = () => {
        fetch(`/groups/${this.props.group}/lists/${this.props.list}
            /tasks/${this.props.task.id}`, {
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

    render() {
        const task = this.props.task;
        const { classes } = this.props;
        return (
        <li>
            <div className={classes.root}>
            <Checkbox />
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
  
export default withStyles(styles)(Task);
  