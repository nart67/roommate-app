import React, { Component } from 'react'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from 'material-ui/transitions/Collapse';
import TaskList from './TaskList';

class Group extends Component {
    state = { open: false };

    constructor(props) {
        super(props);
    }

    handleClick = () => {
      this.setState({ open: !this.state.open });
    };

    render() {
        const { classes } = this.props;

        return (
          <div>
          <ListItem button onClick={this.handleClick}>
            <ListItemText inset primary={ this.props.group.displayName } />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            {
                 this.props.group.lists.map((list) => 
                    <TaskList list={list} />
                )
            }
            </List>
          </Collapse>
          </div>
        );
    }
} 

  export default Group;