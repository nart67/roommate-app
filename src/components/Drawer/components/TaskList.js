import React, { Component } from 'react'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

const TaskList = (props) => (
  <Link to={`/lists/${props.list._id}`}>
    <ListItem button className={props.classes.nested}>
        <ListItemText inset primary={props.list.displayName} />
    </ListItem>
  </Link>
)

TaskList.propTypes = {
  classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(TaskList);