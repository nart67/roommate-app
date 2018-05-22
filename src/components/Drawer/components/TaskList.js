import React from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core/';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AssignmentIcon from '@material-ui/icons/Assignment';

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
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
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