import AppConstants from '../constants/AppConstants';

import api from '../api';
// нужно добавить проверку что due это валидная дата
function fixUTC(due) {
  if (due) {
    due = new Date(due);
    if (due.getTimezoneOffset() != 0) {
      due.setTime(due.getTime() - due.getTimezoneOffset()*60000);
    }
    return due;
  }
  else {
    return null;
  }
}

const TasksActions = {
  loadTasks(taskListId) {
    return (dispatch) => {
      dispatch({
        type  : AppConstants.TASKS_LOAD_REQUEST
      });

      api.listTasks(taskListId)
            .then(data => {
              dispatch({
                type  : AppConstants.TASKS_LOAD_SUCCESS,
                items : data.items || []
              });
            })
            .catch(err => {
              dispatch({
                type  : AppConstants.TASKS_LOAD_FAIL,
                error : err
              });
            });
    };
  },

  updateTask(params) {
    return (dispatch) => {
      dispatch({
        type   : AppConstants.TASK_UPDATE_REQUEST,
        task   : {
                id      : params.id,
                title   : params.text,
                notes   : params.note,
                status  : params.isCompleted ? 'completed' : 'needsAction',
                due     : fixUTC(params.due)
        }
      });

      api.updateTask({
        taskListId  : params.taskListId,
        taskId      : params.id,
        title       : params.text,
        notes       : params.note,
        status      : params.isCompleted ? 'completed' : 'needsAction',
        due         : fixUTC(params.due)
      })
            .then(data => {
              dispatch({
                type   : AppConstants.TASK_UPDATE_SUCCESS,
                task   : data
              });
            })
            .catch(err => {
              dispatch({
                type  : AppConstants.TASK_UPDATE_FAIL,
                error : err
              });
            });
    };
  },

  createTask(params) {
    return (dispatch) => {
      const newTask = {
        taskListId: params.taskListId,
        title: params.text,
        notes: params.note
      };

      newTask.due = fixUTC(params.due);

      api.insertTask(newTask)
            .then(data => {
              dispatch({
                type : AppConstants.TASK_CREATE_SUCCESS,
                task : data
              });
            })
            .catch(err => {
              dispatch({
                type  : AppConstants.TASK_CREATE_FAIL,
                error : err
              });
            });
    };
  },

  deleteTask(params) {
    return (dispatch) => {
      api.deleteTask({
        taskListId: params.taskListId,
        taskId: params.taskId
      })
            .then(data => {
              dispatch({
                type   : AppConstants.TASK_DELETE_SUCCESS,
                taskId : params.taskId,
                task   : data
              });
            })
            .catch(err => {
              dispatch({
                type  : AppConstants.TASK_DELETE_FAIL,
                error : err
              });
            });
    };
  },
};

export default TasksActions;
