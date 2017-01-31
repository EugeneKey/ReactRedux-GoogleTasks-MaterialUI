/*global gapi*/
// import {clientId} from '../config';
const CLIENT_ID = '805216255136-i2u7r2e71qqp710bffh402c5vmvd3tdt.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/tasks https://www.googleapis.com/auth/plus.me';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest'];

//'https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/tasks/'

export default {
    loadClient() {
        return new Promise((resolve, reject) => {
            gapi.load('client:auth2', () => {
                gapi.client.init({
                    discoveryDocs: DISCOVERY_DOCS,
                    clientId: CLIENT_ID,
                    scope: SCOPES
                })
                .then(() => {
                    gapi.auth2.getAuthInstance().isSignedIn.get()
                    ? resolve(true)
                    : reject('need login')
                });
            });
        });  
    },

    logIn() {
        return new Promise((resolve, reject) => {
            gapi.auth2.getAuthInstance().signIn()
            .then(() => {
                return gapi.client.load('tasks', 'v1', () => gapi.client.load('plus', 'v1', () => resolve() ) );
            })
            .then(null, err => {
                return reject(err);
            });
        });
    },

    signOut() {
        return new Promise((resolve, reject) => {
            gapi.auth2.getAuthInstance().signOut()
            .then(() => {
                gapi.auth2.getAuthInstance().disconnect();
                return resolve(true);
            });
        });
    },

    listTaskLists() {
        const request =  gapi.client.tasks.tasklists.list();
        return this.makeRequest(request);
    },

    showTaskList(taskListId) {
        const request = gapi.client.tasks.tasklists.get({
            tasklist: taskListId
        });

        return this.makeRequest(request);
    },

    insertTaskList({title}) {
        const request = gapi.client.tasks.tasklists.insert({
            title: title
        });

        return this.makeRequest(request);
    },

    updateTaskList({taskListId, title}) {
        const request = gapi.client.tasks.tasklists.update({
            tasklist: taskListId,
            id: taskListId,
            title: title
        });

        return this.makeRequest(request);
    },

    deleteTaskList({taskListId}) {
        const request = gapi.client.tasks.tasklists.delete({
            tasklist: taskListId
        });

        return this.makeRequest(request);
    },

    listTasks(taskListId) {
        const request = gapi.client.tasks.tasks.list({
            tasklist: taskListId
        });

        return this.makeRequest(request);
    },

    insertTask({taskListId, ...params}) {
        const request = gapi.client.tasks.tasks.insert({
            tasklist : taskListId,
            ...params
        });

        return this.makeRequest(request);
    },

    updateTask({taskListId, taskId, ...params}) {
        const request = gapi.client.tasks.tasks.update({
            tasklist : taskListId,
            task     : taskId,
            id       : taskId,
            ...params
        });

        return this.makeRequest(request);
    },

    deleteTask({taskListId, taskId}) {
        const request = gapi.client.tasks.tasks.delete({
            tasklist : taskListId,
            task     : taskId,
            id       : taskId
        });

        return this.makeRequest(request);
    },

    makeRequest(requestObj) {
        return new Promise((resolve, reject) => {
            requestObj.execute(resp =>
                resp.error
                ? reject(resp.error)
                : resolve(resp.result)
            );
        });
    }
};