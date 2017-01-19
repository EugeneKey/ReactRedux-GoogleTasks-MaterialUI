import React, { Component } from 'react';

import TaskListsStore from '../stores/TaskListsStore';
import TaskListsActions from '../actions/TaskListsActions';

import TaskListCreateModal from '../components/TaskListCreateModal.jsx';
import TasklistsPage from '../components/TasklistsPage.jsx';

function getStateFromFlux() {
    return {
        taskLists: TaskListsStore.getTaskLists()
    }
}

class TasklistsPageContainer extends Component {
    state = {
        ...getStateFromFlux(),
        isCreatingTaskList: false
    }

    constructor(props) {
        super(props);

        TaskListsActions.loadTaskLists();

        // Bind `this` within methods
        this.handleAddTaskList = this.handleAddTaskList.bind(this);
        this.handleTaskListCreateModalClose = this.handleTaskListCreateModalClose.bind(this);
        this.handleTaskListSubmit = this.handleTaskListSubmit.bind(this);      
    }

    componentDidMount() {
        TaskListsStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        TaskListsStore.removeChangeListener(this._onChange);
    }

    handleAddTaskList() {
        this.setState({ isCreatingTaskList : true });
    }

    handleTaskListCreateModalClose() {
        this.setState({ isCreatingTaskList : false });
    }

    handleTaskListSubmit(taskList) {
        TaskListsActions.createTaskList(taskList);

        this.setState({ isCreatingTaskList : false });
    }

    render() {
        return (
            <div>
                <TasklistsPage
                    taskLists={this.state.taskLists}
                    selectedListId={this.props.params.id}
                    page={this.props.children}
                    onAddTaskList={this.handleAddTaskList}
                    onLogOut={this.onLogOut}
                />

                <TaskListCreateModal
                    isOpen={this.state.isCreatingTaskList}
                    onSubmit={this.handleTaskListSubmit}
                    onClose={this.handleTaskListCreateModalClose}
                />
            </div>
        );
    }

    _onChange = () => {
        this.setState(getStateFromFlux());
    }
}

TasklistsPageContainer.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default TasklistsPageContainer;
