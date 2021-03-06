
import { Actions } from "./Actions";
import swal from "sweetalert";
const API_END_POINT = 'http://localhost:2000';
function insertTodoToDatabase(todoState) {
    return dispatch => {
        console.log(todoState);
        fetch(`http://localhost:2000/todo/api/v1.0/tasks/add`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: todoState.title,
                description: todoState.description
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    dispatch({
                        type: Actions.addTodoSuccess,
                        payload: data
                    })
                }
            })
            .catch(err => dispatch({
                type: Actions.addTodoError,
                err
            }))
    };
};



function deleterTodoFromDatabase(todoId) {
    return dispatch => {
        console.log(todoId);
        fetch(`${API_END_POINT}/todo/api/v1.0/tasks/delete/${todoId}`, {
            method: "delete",

        })
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: Actions.deleteTodoSuccess,
                    payload: data
                })
            })
            .catch(err => dispatch({
                type: Actions.deleteTodoError,
                err
            }))
    }
};

function updateTodoInDatabase({ updateDescription,
    updateTitle,
    updateDoneStatus,
    todoId
}) {
    return dispatch => {
        fetch(`${API_END_POINT}/todo/api/v1.0/tasks/edit/${todoId}`, {
            method: 'put',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: updateTitle,
                description: updateDescription
            })

        })
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    swal('Wohaamiii!!', 'Your task has been updated', 'success');
                    dispatch({
                        type: Actions.updateTodoSuccess,
                        payload: data
                    })
                }
            })
            .catch(err => dispatch({
                type: Actions.updateTodoError,
                err
            }))
    }
};

function getAllTodosFromDatabase() {
    return dispatch => {
        fetch(`${API_END_POINT}/todo/api/v1.0/tasks`)
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: Actions.readAllTodoSuccess,
                    payload: data
                })
            })
            .catch(err => dispatch({
                type: Actions.readAllTodoError,
                err
            }))
    };
};

function taskDoneAttempt(todo, status) {
    return dispatch => {
        fetch(``)
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    swal('Wohaamiii!!', 'Your task has been updated', 'success');
                    dispatch({
                        type: Actions.updateTodoSuccess,
                        payload: data
                    })
                }
            })
            .catch(err => dispatch({
                type: Actions.readAllTodoError,
                err
            }))
    };
};

function getSpecificTodo() {

};


export {
    insertTodoToDatabase,
    deleterTodoFromDatabase,
    updateTodoInDatabase,
    getAllTodosFromDatabase,
    getSpecificTodo,
    taskDoneAttempt
};


