import AppConstants from '../constants/AppConstants';

const initialState = {
  listTaskLists: [],
  currentTaskList: []
};

function formatTaskList(data) {
  return {
    id   : data.id,
    name : data.title
  };
}

function taskListsReducer(state = initialState, action) {
  switch(action.type) {
    case AppConstants.TASK_LISTS_LOAD_SUCCESS: {
      return Object.assign({}, state, {
        listTaskLists: action.items.map(formatTaskList)
      });
    }

    case AppConstants.TASK_LISTS_LOAD_FAIL: {
      return Object.assign({}, state, {
        listTaskLists: [],
        error: action.error
      });        	
    }

    case AppConstants.TASK_LIST_LOAD_SUCCESS: {
      return Object.assign({}, state, {
        currentTaskList: formatTaskList(action.taskList)
      });
    }

    case AppConstants.TASK_LIST_LOAD_FAIL: {
      return Object.assign({}, state, {
        error: action.error
      });
    }

    case AppConstants.TASK_LIST_CREATE_SUCCESS: {
      return Object.assign({}, state, {
          listTaskLists: [
          ...state.listTaskLists, formatTaskList(action.taskList)
        ]
      });
    }

    case AppConstants.TASK_LIST_CREATE_FAIL: {
      return Object.assign({}, state, {
        error: action.error
      });
    }

    case AppConstants.TASK_LIST_UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        listTaskLists: 
          state.listTaskLists.map((taskList) => {
            if (taskList.id === action.taskListId) {
              return formatTaskList(action.taskList)
            }
            return taskList
          }),
        currentTaskList: 
          state.currentTaskList && state.currentTaskList.id === action.taskListId
            ?
              formatTaskList(action.taskList)
            :
              state.currentTaskList
      });  
    }

    case AppConstants.TASK_LIST_UPDATE_FAIL: {
      return Object.assign({}, state, {
        error: action.error
      });
    }

    case AppConstants.TASK_LIST_DELETE_SUCCESS: {
      let i = state.listTaskLists.findIndex(taskList => taskList.id === action.taskListId);
      return Object.assign({}, state, {
        listTaskLists:
          state.listTaskLists.slice(0,i).concat(state.listTaskLists.slice(++i)),
        currentTaskList: 
          state.currentTaskList && state.currentTaskList.id === action.taskListId
            ?
              []
            :
              state.currentTaskList
      });     
    }

    case AppConstants.TASK_LIST_DELETE_FAIL: {
      return Object.assign({}, state, {
        error: action.error
      });        	
    }

    default: {
      return state;
    }
  }
}

const TaskListsReducer = {
  tasklists: taskListsReducer
};

export default TaskListsReducer;