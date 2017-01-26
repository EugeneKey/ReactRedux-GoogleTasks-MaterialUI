import React, { Component } from 'react';

import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import CircularProgress from 'material-ui/CircularProgress';

import Task from './Task.jsx';

import '../styles/TasksPage.less';

const ENTER_KEY = 13;
const ESC_KEY = 27;

class TasksPage extends Component {
    state = {
        isEditingTaskList: false
    }

    constructor(props) {
        super(props);

        // Bind `this` within methods
        this.handleEditTaskList = this.handleEditTaskList.bind(this);
        this.handleSubmitTaskList = this.handleSubmitTaskList.bind(this);
        this.handleTaskListEditKeyDown = this.handleTaskListEditKeyDown.bind(this);   
    }

    handleEditTaskList() {
        this.setState({
            isEditingTaskList: true
        }, () => this.taskList.focus() );
    }

    handleSubmitTaskList() {
        this.saveTaskList();
    }

    handleTaskListEditKeyDown(e) {
        if (e.keyCode === ENTER_KEY) {
            this.saveTaskList();
        }

        if (e.keyCode === ESC_KEY) {
            this.cancelEditingTaskList();
        }
    }

    saveTaskList() {
        this.props.onUpdateTaskList({
            name: this.taskList.value
        });

        this.cancelEditingTaskList();
    }

    cancelEditingTaskList() {
        this.setState({ isEditingTaskList: false });
    }

    renderTasks() {
        return (
            <div className='TasksPage__tasks'>
                {
                    this.props.tasks.listTasks.map(task =>
                        <Task
                            key={task.id}
                            text={task.text}
                            note={task.note}
                            due={task.due}
                            isCompleted={task.isCompleted}
                            onDelete={this.props.onTaskDelete.bind(null, task.id)}
                            onStatusChange={this.props.onTaskStatusChange.bind(null, task.id)}
                            onUpdate={this.props.onTaskUpdate.bind(null, task.id)}
                        />
                    )
                }
            </div>
        );
    }

    render() {
        if (this.props.tasks.error) {
            return (
                <div className='TasksPage'>
                    <div className='TasksPage__error'>
                        {this.props.tasks.error}
                    </div>
                </div>
            );
        }
        
        return (
            <div className='TasksPage'>
                <div className='TasksPage__header'>
                    {
                        this.state.isEditingTaskList
                        ?
                            <input
                                ref={c => this.taskList = c}
                                className='TasksPage__title-input'
                                defaultValue={this.props.taskList.name}
                                onKeyDown={this.handleTaskListEditKeyDown}
                                onBlur={this.cancelEditingTaskList.bind(this)}
                            />
                        :
                            <h2
                                className='TasksPage__title'
                                onClick={this.handleEditTaskList}
                            >
                                {this.props.taskList.name}
                            </h2>
                    }

                    <div className='TasksPage__tools'>
                        <IconButton onClick={this.props.onAddTask}>
                            <ContentAdd />
                        </IconButton>
                        <IconButton onClick={this.props.onDeleteTaskList}>
                            <ActionDelete />
                        </IconButton>
                    </div>
                </div>

                {
                    this.props.tasks.isLoadingTasks
                    ?
                        <CircularProgress />
                    :
                        this.renderTasks()
                }
            </div>
        );
    }
}

export default TasksPage;
