import React, { Component } from 'react'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

const TaskList = (props) => {
  const list = props.List.itemsById[props.list];
  return (
  <Link to={`/lists/${list.id}`}>
    <ListItem button className={props.classes.nested}>
        <ListItemText inset primary={list.displayName} />
    </ListItem>
  </Link>
)}

TaskList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  List: state.orm.TaskList
});

export default withStyles(styles)(connect(mapStateToProps)(TaskList));