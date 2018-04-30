import React, { Component } from 'react'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from 'material-ui/transitions/Collapse';
import TaskList from './TaskList';
import { connect } from 'react-redux';

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
          <ListItem button onClick={this.handleClick}>
            <ListItemText inset primary={ this.group.displayName } />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
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


const mapStateToProps = state => ({
  Group: state.orm.Group,
  GroupLists: state.orm.GroupLists
});

  export default connect(mapStateToProps)(Group);