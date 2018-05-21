import React from 'react'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ChatIcon from '@material-ui/icons/ChatBubbleOutline';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

const Channel = (props) => {
  const channel = props.Channel.itemsById[props.channel];
  return (
  <Link to={`/channels/${channel.id}`}>
    <ListItem button className={props.classes.nested}>
      <ListItemIcon>
        <ChatIcon />
      </ListItemIcon>
      <ListItemText inset primary={channel.displayName} />
    </ListItem>
  </Link>
)}

Channel.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  Channel: state.orm.Channel
});

export default withStyles(styles)(connect(mapStateToProps)(Channel));