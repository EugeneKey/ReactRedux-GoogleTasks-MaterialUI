import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class TaskCreateModal extends Component {
    state = {
        text : '',
        note : '',
        due  : null
    }    
    
    constructor(props) {
        super(props);

        // Bind `this` within methods
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleNoteChange = this.handleNoteChange.bind(this);
        this.handleDueChange = this.handleDueChange.bind(this);
    }

    handleClose() {
        const { onClose } = this.props;

        this.resetState();

        if (onClose) {
            onClose();
        }
    }

    handleSubmit() {
        const { onSubmit } = this.props;

        if (onSubmit) {
            onSubmit({
                text: this.state.text,
                note: this.state.note,
                due: this.state.due
            });
        }

        this.resetState();
    }

    handleTextChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    handleNoteChange(e) {
        this.setState({
            note: e.target.value
        });
    }

    handleDueChange(e, date) {
        this.setState({
            due: date
        });
    }

    resetState() {
        this.setState({
            text: '',
            note: '',
            due: null
        });
    }

    render() {
        const { text, note, due } = this.state;
        const { isOpen } = this.props;

        return (
            <Dialog
                className='TaskCreateModal'
                contentStyle={{ maxWidth: 400 }}
                actions={[
                    <FlatButton
                        label='Cancel'
                        onTouchTap={this.handleClose}
                    />,
                    <FlatButton
                        primary
                        label='Submit'
                        disabled={!text}
                        onTouchTap={this.handleSubmit}
                    />
                ]}
                open={isOpen}
                onRequestClose={this.handleClose}
            >
                <h3 className='TaskCreateModal__modal-title'>Add task</h3>
                <TextField
                    fullWidth
                    ref={c => this.taskInput = c}
                    value={text}
                    onChange={this.handleTextChange}
                    hintText='e.g. buy a bottle of milk'
                    floatingLabelText='Enter task title'
                />
                <TextField
                    fullWidth
                    value={note}
                    multiLine={true}
                    rows={2}
                    onChange={this.handleNoteChange}
                    hintText='e.g. 2.6% whole milk'
                    floatingLabelText='Enter task note'
                />
                <DatePicker
                    autoOk
                    fullWidth
                    value={due}
                    onChange={this.handleDueChange}
                    floatingLabelText='Enter due time'
                />
            </Dialog>
        );
    }
}

export default TaskCreateModal;
