import AppConstants from '../constants/AppConstants';

import api from '../api';

const TaskListsActions = {
  loadTaskLists() {
    return (dispatch) => {
      api.listTaskLists()
            .then(data => {
              dispatch({
                type: AppConstants.TASK_LISTS_LOAD_SUCCESS,
                items: data.items
              });
            })
            .catch(err => {
              dispatch({
                type: AppConstants.TASK_LISTS_LOAD_FAIL,
                error: err
              });
            });
    };
  },

  loadTaskList(taskListId) {
    return (dispatch) => {
      api.showTaskList(taskListId)
            .then(data => {
              dispatch({
                type: AppConstants.TASK_LIST_LOAD_SUCCESS,
                taskList: data
              });
            })
            .catch(err => {
              dispatch({
                type: AppConstants.TASK_LIST_LOAD_FAIL,
                error: err
              });
            });
    };
  },

  createTaskList(params) {
    return (dispatch) => {
      api.insertTaskList({title: params.name})
            .then(data => {
              dispatch({
                type     : AppConstants.TASK_LIST_CREATE_SUCCESS,
                taskList : data
              });
            })
            .catch(err => {
              dispatch({
                type  : AppConstants.TASK_LIST_CREATE_FAIL,
                error : err
              });
            });
    };
  },

  updateTaskList(params) {
    return (dispatch) => {
      api.updateTaskList({taskListId: params.taskListId, title: params.name})
            .then(data => {
              dispatch({
                type       : AppConstants.TASK_LIST_UPDATE_SUCCESS,
                taskListId : params.taskListId,
                taskList   : data
              });
            })
            .catch(err => {
              dispatch({
                type  : AppConstants.TASK_LIST_UPDATE_FAIL,
                error : err
              });
            });
    };
  },

  deleteTaskList(params) {
    return (dispatch) => {
      api.deleteTaskList({taskListId: params.taskListId})
            .then(() => {
              dispatch({
                type       : AppConstants.TASK_LIST_DELETE_SUCCESS,
                taskListId : params.taskListId
              });
            })
            .catch(err => {
              dispatch({
                type  : AppConstants.TASK_LIST_DELETE_FAIL,
                error : err
              });
            });
    };
  }
};

export default TaskListsActions;
