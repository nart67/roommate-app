import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './Invite.css'
// Try to stay with CSS in JS but display works better in css file

const styles = theme => ({
    invContent: {
        width: 'calc(100% - 208px)',
        'line-height': 1
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class Invite extends Component {
    acceptClick = () => {
        this.props.accept(this.props.invite.id);
    }

    declineClick = () => {
        this.props.decline(this.props.invite.id);
    }

    render() {
        const { classes, invite } = this.props;
        return (
            <li>
                <div className='invContainer'>
                <div className={classes.invContent}>
                    <Typography variant="headline" gutterBottom>
                        Group: {invite.group.displayName}
                    </Typography>
                    <Typography variant="subheading" gutterBottom>
                        From: {invite.sender.displayName}
                    </Typography>
                </div>
                <div className={classes.invButtons}>
                    <Button variant="raised" color="primary" className={classes.button}
                        onClick={this.acceptClick}>
                        Accept
                    </Button>
                    <Button variant="raised" color="secondary" className={classes.button}
                        onClick={this.declineClick}>
                        Decline
                    </Button>
                </div>
                </div>
            </li>
        )
    }
}

export default withStyles(styles)(Invite);