import AppConstants from '../constants/AppConstants';

const initialState = {
  listTasks: [],
  isLoadingTasks: true
};

function fixUTC(due) {
  due = new Date(due);
  if (due.getTimezoneOffset() != 0) {
    due.setTime(due.getTime() + due.getTimezoneOffset()*60000);
  }
  return due;
}

function formatTask(data) {
  return {
    id          : data.id,
    text        : data.title,
    note        : data.notes,
    due         : data.due ? fixUTC(data.due) : null,
    isCompleted : data.status === 'completed',
    position    : data.position
  };
}

function getErrorMessageByCode(code) {
  const errorMessages = {
    400: 'Cannot load task list'
  };

  return errorMessages[code] || 'Something bad happened';
}

function tasksReducer(state = initialState, action) {
  switch(action.type) {
    case AppConstants.TASKS_LOAD_REQUEST: {
      return Object.assign({}, state, {
        listTasks: [],
        isLoadingTasks: true
      });
    }

    case AppConstants.TASKS_LOAD_SUCCESS: {
      return Object.assign({}, state, {
        listTasks: action.items.map(formatTask),
        isLoadingTasks: false
      });            
    }

    case AppConstants.TASKS_LOAD_FAIL: {
      return Object.assign({}, state, {
        listTasks: [],
        error: getErrorMessageByCode(action.error.code),
        isLoadingTasks: false
      });
    }

    case AppConstants.TASK_UPDATE_REQUEST: {
      return Object.assign({}, state, {
        listTasks:
          state.listTasks.map((task) => {
            if (task.id === action.task.id) {
              return formatTask(action.task)
            }
            return task
          }),
      });
    }

    case AppConstants.TASK_UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        listTasks: 
          state.listTasks.map((task) => {
            if (task.id === action.task.id) {
              return formatTask(action.task)
            }
            return task
          }),
      });
    }

    case AppConstants.TASK_UPDATE_FAIL: {
      return Object.assign({}, state, {
        error: getErrorMessageByCode(action.error.code),
      });
    }

    case AppConstants.TASK_CREATE_SUCCESS: {
      return Object.assign({}, state, {
        listTasks: 
          [].concat(formatTask(action.task), state.listTasks)
      });
    }

    case AppConstants.TASK_CREATE_FAIL: {
      return Object.assign({}, state, {
        error: getErrorMessageByCode(action.error.code),
      });
    }    

    case AppConstants.TASK_DELETE_SUCCESS: {
      let i = state.listTasks.findIndex(task => task.id === action.taskId);
      return Object.assign({}, state, {
        listTasks: state.listTasks.slice(0,i).concat(state.listTasks.slice(++i))
      });
    }

    case AppConstants.TASK_DELETE_FAIL: {
      return Object.assign({}, state, {
        error: getErrorMessageByCode(action.error.code),
      });
    }

    default: {
      return state;
    }
  }
}

const TasksReducer = {
  tasks: tasksReducer
};

export default TasksReducer;