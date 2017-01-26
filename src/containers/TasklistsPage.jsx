import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import TaskListsActions from '../actions/TaskListsActions';
import SessionActions from '../actions/SessionActions';

import TaskListCreateModal from '../components/TaskListCreateModal.jsx';
import TasklistsPage from '../components/TasklistsPage.jsx';

class TasklistsPageContainer extends Component {
    state = {
        isCreatingTaskList: false
    }

    constructor(props) {
        super(props);
        this.props.dispatch(TaskListsActions.loadTaskLists());

        // Bind `this` within methods
        this.handleAddTaskList = this.handleAddTaskList.bind(this);
        this.handleTaskListCreateModalClose = this.handleTaskListCreateModalClose.bind(this);
        this.handleTaskListSubmit = this.handleTaskListSubmit.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    handleAddTaskList() {
        this.setState({ isCreatingTaskList : true });
    }

    handleTaskListCreateModalClose() {
        this.setState({ isCreatingTaskList : false });
    }

    handleTaskListSubmit(taskList) {
        this.props.dispatch(TaskListsActions.createTaskList(taskList));

        this.setState({ isCreatingTaskList : false });
    }

    handleLogOut() {
        this.props.dispatch(SessionActions.logout());
    }

    handleRedirect(link) {
        browserHistory.push(link);
    }

    render() {
        return (
            <div>
                <TasklistsPage
                    taskLists={this.props.tasklists.listTaskLists}
                    selectedListId={this.props.params.id}
                    page={this.props.children}
                    onAddTaskList={this.handleAddTaskList}
                    onLogOut={this.handleLogOut}
                    onRedirect={this.handleRedirect}
                />

                <TaskListCreateModal
                    isOpen={this.state.isCreatingTaskList}
                    onSubmit={this.handleTaskListSubmit}
                    onClose={this.handleTaskListCreateModalClose}
                />
            </div>
        );
    }
}

TasklistsPageContainer.propsTypes = {
    tasklists: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        tasklists: state.tasklists
    };
}

export default connect(mapStateToProps)(TasklistsPageContainer);
