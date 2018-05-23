import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class InviteDialog extends Component {
    state = {
        value: ''
    }

    handleChange = event => {
        this.setState({ value: event.target.value });
    };

    sendInvite = () => {
        const data = new URLSearchParams()
        data.append('invite', JSON.stringify({recipient: this.state.value}));
        fetch(`/api/groups/${this.props.group}/invites/`, {
            credentials: 'same-origin',
            method: 'POST',
            body: data,
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        })
        .then(response => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
              return response.json();
            }
        }).then(data => {
            if (data) {
                console.log(data);
            }
        });
        this.props.closeDialog();
    }

    render() {
        const props = this.props;
        return (
            <Dialog
            open={props.open}
            onClose={props.closeDialog}
            aria-labelledby="form-dialog-title"
            >
            <DialogTitle id="form-dialog-title">Send Invite</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Enter your friend's user ID here to invite them to group {props.groupName}
                </DialogContentText>
                <TextField
                autoFocus
                margin="dense"
                id="user"
                label="User ID"
                fullWidth
                onChange={this.handleChange}
                value={this.state.value}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.closeDialog} color="primary">
                Cancel
                </Button>
                <Button onClick={this.sendInvite} color="primary">
                Send Invite
                </Button>
            </DialogActions>
            </Dialog>
        );
    }
}