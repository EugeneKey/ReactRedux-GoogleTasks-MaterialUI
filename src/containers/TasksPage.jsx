import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import TasksActions from '../actions/TasksActions';
import TaskListsActions from '../actions/TaskListsActions';

import TasksPage from '../components/TasksPage.jsx';
import TaskCreateModal from '../components/TaskCreateModal.jsx';

class TasksPageContainer extends Component {    
    state = {
        isCreatingTask: false
    }

    constructor(props) {
        super(props);     

        // Bind `this` within methods
        this.handleTaskStatusChange = this.handleTaskStatusChange.bind(this);
        this.handleTaskUpdate = this.handleTaskUpdate.bind(this);
        this.handleTaskDelete = this.handleTaskDelete.bind(this);
        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleTaskCreateModalClose = this.handleTaskCreateModalClose.bind(this);
        this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
        this.handleDeleteTaskList = this.handleDeleteTaskList.bind(this);
        this.handleUpdateTaskList = this.handleUpdateTaskList.bind(this);        
    }
    componentWillMount() {
        this.props.dispatch(TasksActions.loadTasks(this.props.params.id));
        this.props.dispatch(TaskListsActions.loadTaskList(this.props.params.id));   
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.params.id !== nextProps.params.id) {
            this.props.dispatch(TasksActions.loadTasks(nextProps.params.id));
            this.props.dispatch(TaskListsActions.loadTaskList(nextProps.params.id));
        }
    }

    handleTaskStatusChange(taskId, { isCompleted }) {
        this.props.dispatch(TasksActions.updateTaskStatus({
            taskListId: this.props.params.id,
            taskId: taskId,
            isCompleted: isCompleted
        }));
    }

    handleTaskUpdate(taskId, task) {
        this.props.dispatch(TasksActions.updateTask({
            taskListId: this.props.params.id,
            taskId: taskId,
            ...task
        }));
    }

    handleTaskDelete(taskId) {
        this.props.dispatch(TasksActions.deleteTask({
            taskListId: this.props.params.id,
            taskId: taskId
        }));
    }

    handleAddTask() {
        this.setState({ isCreatingTask : true });
    }

    handleTaskCreateModalClose() {
        this.setState({ isCreatingTask : false });
    }

    handleTaskSubmit(task) {
        const taskListId = this.props.params.id;

        this.props.dispatch(TasksActions.createTask({ taskListId, ...task }));

        this.setState({ isCreatingTask : false });
    }

    handleDeleteTaskList() {
        const isConfirmed = confirm(
            'Are you sure you want delete this task list? All tasks in it will be deleted too'
        );

        if (isConfirmed) {
            this.props.dispatch(TaskListsActions.deleteTaskList({
                taskListId: this.props.params.id
            }));
        }
        browserHistory.push('/lists');
    }

    handleUpdateTaskList({ name }) {
        this.props.dispatch(TaskListsActions.updateTaskList({
            taskListId: this.props.params.id,
            name
        }));
    }

    render() {
        return (
            <div>
                <TasksPage
                    taskList={this.props.tasklists.currentTaskList}
                    tasks={this.props.tasks}
                    onUpdateTaskList={this.handleUpdateTaskList}
                    onAddTask={this.handleAddTask}
                    onDeleteTaskList={this.handleDeleteTaskList}
                    onTaskDelete={this.handleTaskDelete}
                    onTaskStatusChange={this.handleTaskStatusChange}
                    onTaskUpdate={this.handleTaskUpdate}
                />
                <TaskCreateModal
                    isOpen={this.state.isCreatingTask}
                    onSubmit={this.handleTaskSubmit}
                    onClose={this.handleTaskCreateModalClose}
                />
            </div>
        );
    }
}

TasksPageContainer.propsTypes = {
    tasklists: PropTypes.object.isRequired,
    tasks: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        tasklists: state.tasklists,
        tasks: state.tasks
    };
}

export default connect(mapStateToProps)(TasksPageContainer);
