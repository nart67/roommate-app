import React, { Component } from 'react'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    nested: {
      paddingLeft: theme.spacing.unit * 4,
    },
  });

const TaskList = (props) => (
    <ListItem button className={props.classes.nested}>
        <ListItemText inset primary={props.list.displayName} />
    </ListItem>
)

TaskList.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(TaskList);