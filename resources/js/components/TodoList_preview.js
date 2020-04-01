import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';
import Axios from 'axios';

class TodoListPreviewItem extends Component {
    constructor(props) {
        super(props);
    }

    redirectToList(id) {
        document.location.href = "/todolist/" + id;
    }

    async AddCollaborator(id) {

        // Get info about the request (input values)
        var CollaboratorEmail = this.refs.CollaboratorEmail.value;
        var CollaboratorRole = this.refs.CollaboratorRole.checked;

        try { // try the whole collaborator adding process

            let GetId_promise = await Axios({ // get collaborator id from his email adress
                method: 'post',
                url: 'api/ToDoListUser/get',
                data: {
                    email: CollaboratorEmail
                },
            })

            // change radio input value in role value
            if (!CollaboratorRole) {
                CollaboratorRole = 1;
            }
            else {
                CollaboratorRole = 2;
            }


            if (GetId_promise.data.id != undefined) { // if user exist

                let GetRoleList_promise = await Axios({ // get the role list of the current todolist
                    method: 'get',
                    url: 'api/ToDoListUser/' + id,
                })

                // init some temp var
                let AlreadyHaveRole = false;
                let currentRole;
                // for the length of the list of role of the current todolist
                for (let i = 0; i < GetRoleList_promise.data.length; i++) {
                    // if the user_id of the user we wanna add is already in this list
                    if (GetRoleList_promise.data[i].user_id == GetId_promise.data.id) {
                        // that mean that user already have a role
                        AlreadyHaveRole = true;
                        currentRole = GetRoleList_promise.data[i].role // get his current role
                        break;
                    }
                }

                if (!AlreadyHaveRole) { // if he didn't have a role in this todolist
                    // add him
                    let createRole_promise = await Axios({
                        method: 'post',
                        url: '/api/ToDoListUser',
                        data: {
                            to_do_list_id: id,
                            user_id: GetId_promise.data.id,
                            role: CollaboratorRole
                        },
                    })
                    alert("Collaborator added ! ") // success
                }
                else { // if he did have a role in this todolist
                    if (currentRole != CollaboratorRole) { // check if he has the same role that we want to add to him
                        // if not change his current role
                        let ChangeRole_promise = await Axios({
                            method: 'put',
                            url: '/api/ToDoListUser/' + id,
                            data: {
                                user_id: GetId_promise.data.id,
                                role: CollaboratorRole
                            },
                        })
                        alert("Collaborator added ! ") // success
                    }
                    else {
                        // alert user that the collaborator he want to add has already this role
                        alert("Collaborator has already this role ! ")
                    }
                }
            }
            else { // if Collaborator ID is undefined
                alert("User do not exist !")
            }
        }
        catch (e) { // if collaborator adding process fail somewhere
            alert("Error while adding collaborator !")
        }

    }

    async DeleteList(id) {
        // waiting the list is deleted
        try {
            // delete the todolist
            let delete_list = await Axios({
                method: 'delete',
                url: 'http://127.0.0.1:8000/api/ToDoList/' + id
            })
            // clear all roles about this todolist
            let delete_roles = await Axios({
                method: 'delete',
                url: 'http://127.0.0.1:8000/api/ToDoListUser/' + id
            })
            // remove the list component when it's done
            this.props.removeList(this.props.index);
        }
        catch (e) {
            console.error("error while deleting a list ! " + e)
        }

    }
    render() {
        return (
            <div className="card">
                <div className="card-body" onClick={() => this.redirectToList(this.props.data.id)} style={{ cursor: 'pointer' }}>
                    <h1>{this.props.data.ListName}</h1>
                    <h2>{this.props.data.TodoNumber} Todos</h2>
                </div>
                <span>
                    <input type="text" ref="CollaboratorEmail" className="form-control" placeholder="add a new collaborator..." />
                    <input type="radio" name={"CollaboratorSetting" + this.props.index} value="readOnly" defaultChecked />
                    <label for="readOnly">Read Only</label>
                    <input type="radio" ref="CollaboratorRole" name={"CollaboratorSetting" + this.props.index} value="edit" />
                    <label for="edit">Read/Write</label>
                    <Button onClick={() => this.AddCollaborator(this.props.data.id)}>Add Collaborator </Button>
                </span>
                <Button onClick={() => this.DeleteList(this.props.data.id)}> Delete </Button>
            </div>
        )
    };
}


class TodoListPreview extends Component {
    constructor(props) {
        super(props);
        this.state = { todoLists: [] };
        this.removeList = this.removeList.bind(this);
    }
    async componentWillMount() {
        // get todolist info here
        try {
            // get all todolist where the current user has access
            var todolist_promise = await Axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/ToDoList/',
            })
        }
        catch (e) {
            console.error(e)
        }
        let TodoLists = []
        // for all todolist get the number of remaining todos
        for (var i = 0; i < todolist_promise.data.length; i++) {
            // get content of the todolist
            var todolist_info = await Axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/ToDoList/' + todolist_promise.data[i].id,
            })
            var todo_number = 0;
            // count how many todos are not done
            for (var j = 0; j < todolist_info.data.todo.length; j++) {
                if (todolist_info.data.todo[j].state == 0) { // if the current item isn't done
                    todo_number++;
                }
            }
            // push new item to array
            TodoLists.push({ TodoNumber: todo_number, ListName: todolist_promise.data[i].title, id: todolist_promise.data[i].id })
            this.setState({ todoLists: TodoLists }); // update state
        }
    }

    removeList(index) {
        let todoLists = this.state.todoLists
        todoLists.splice(index, 1);
        this.setState({ todoLists: todoLists });
    }

    render() {
        var items = [];
        for (var i = 0; i < this.state.todoLists.length; i++) {
            items.push({ id: i, data: this.state.todoLists[i] })
        }
        return (
            <div>
                {items.map(TodoListPreviewItems => <TodoListPreviewItem removeList={this.removeList} index={TodoListPreviewItems.id} key={TodoListPreviewItems.id} data={TodoListPreviewItems.data} />)}
                <Button onClick={() => { document.location.href = "/todolist/new" }}>+</Button>
            </div>
        )
    };
}

export default TodoListPreview;



if (document.getElementById('todolist-preview')) {
    ReactDOM.render(<TodoListPreview />, document.getElementById('todolist-preview'));
}
