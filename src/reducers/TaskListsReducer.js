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
    var _listTaskLists = state.listTaskLists;
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
            const newTaskList = formatTaskList(action.taskList);
            _listTaskLists.push(newTaskList);
        	return Object.assign({}, state, {
                listTaskLists: _listTaskLists
            });
        }

        case AppConstants.TASK_LIST_CREATE_FAIL: {
        	return Object.assign({}, state, {
                error: action.error
            });
        }

        case AppConstants.TASK_LIST_UPDATE_SUCCESS: {
            const updatedTaskListIndex = state.listTaskLists.findIndex(taskList => taskList.id === action.taskListId);
            _listTaskLists[updatedTaskListIndex] = formatTaskList(action.taskList);

            return Object.assign({}, state, {
                listTaskLists: _listTaskLists,
                currentTaskList: state.currentTaskList && state.currentTaskList.id === action.taskListId ? formatTaskList(action.taskList) : state.currentTaskList
            });  
        }

        case AppConstants.TASK_LIST_UPDATE_FAIL: {
        	return Object.assign({}, state, {
                error: action.error
            });
        }

        case AppConstants.TASK_LIST_DELETE_SUCCESS: {
            const deletedTaskListIndex = _listTaskLists.findIndex(taskList => taskList.id === action.taskListId);
            _listTaskLists.splice(deletedTaskListIndex, 1);
            return Object.assign({}, state, {
                listTaskLists: _listTaskLists,
                currentTaskList: state.currentTaskList && state.currentTaskList.id === action.taskListId ? [] : state.currentTaskList
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