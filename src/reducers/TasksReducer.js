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
    var _listTasks = state.listTasks;
    switch(action.type) {
        case AppConstants.TASKS_LOAD_REQUEST: {
            return Object.assign({}, state, {
                listTasks: [],
                isLoadingTasks: true
            });
        }

        case AppConstants.TASKS_LOAD_SUCCESS: {
//            console.log(action.items);
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
            const updatedTaskIndex = _listTasks.findIndex(task => task.id === action.taskId);
            _listTasks[updatedTaskIndex].isCompleted = action.isCompleted !== undefined ? action.isCompleted : _listTasks[updatedTaskIndex].isCompleted;
            _listTasks[updatedTaskIndex].text = action.text || _listTasks[updatedTaskIndex].text;
            return Object.assign({}, state, {
                listTasks: _listTasks
            });
        }

        case AppConstants.TASK_UPDATE_SUCCESS: {
            const updatedTaskIndex = _listTasks.findIndex(task => task.id === action.taskId);
            _listTasks[updatedTaskIndex] = formatTask(action.task);
            return Object.assign({}, state, {
                listTasks: _listTasks
            });
        }

        case AppConstants.TASK_DELETE_SUCCESS: {
            const deletedTaskIndex = _listTasks.findIndex(task => task.id === action.taskId);
            _listTasks.splice(deletedTaskIndex, 1);
            return Object.assign({}, state, {
                listTasks: _listTasks
            });
        }

        case AppConstants.TASK_CREATE_SUCCESS: {
            const newTask = formatTask(action.task);
            _listTasks.unshift(newTask);
            return Object.assign({}, state, {
                listTasks: _listTasks
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