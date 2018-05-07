import React, { Component } from 'react'
import List, { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from 'material-ui/transitions/Collapse';
import TaskList from './TaskList';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import GroupMenu from './GroupMenu';
import GroupIcon from '@material-ui/icons/Group'
import PropTypes from 'prop-types';


const styles = theme => ({
  groupItem: {
    paddingLeft: theme.spacing.unit
  },
  icon: {
    marginLeft: theme.spacing.unit
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class Group extends Component {
    state = { open: false };

    constructor(props) {
        super(props);
        this.group = this.props.Group.itemsById[this.props.group];
    }

    handleClick = () => {
      this.setState({ open: !this.state.open });
    };

    listIsInGroup(id) {
      const reference = this.props.GroupLists.itemsById[id];
      if (reference.fromGroupId === this.props.group) return reference.toTaskListId;
      return false;
    }

    render() {
        const { classes } = this.props;

        return (
          <div>
          <ListItem className={classes.groupItem} button onClick={this.handleClick}>
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
            <GroupIcon className={classes.icon} />
            <ListItemText primary={ this.group.displayName } />
            <ListItemSecondaryAction>
              <GroupMenu group={this.props.group} />
            </ListItemSecondaryAction>
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            {
                 this.props.GroupLists.items.map((id) => {
                   const listId = this.listIsInGroup(id);
                    if (listId) return <TaskList list={listId} key={listId} />
                  }
                )
            }
            </List>
          </Collapse>
          </div>
        );
    }
} 

Group.propTypes = {
  group: PropTypes.string,
};

const mapStateToProps = state => ({
  Group: state.orm.Group,
  GroupLists: state.orm.GroupLists
});

export default withStyles(styles)(connect(mapStateToProps)(Group));