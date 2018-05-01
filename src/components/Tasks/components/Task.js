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

const Task = (props) => {
    const task = props.task;
    const { classes } = props;
    return (
    <li>
        <div className={classes.root}>
        <Checkbox />
        {task.title}
        <IconButton className={classes.button} aria-label="Delete">
            <DeleteIcon />
        </IconButton>
        </div>
    </li>
)};

Task.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Task);
  