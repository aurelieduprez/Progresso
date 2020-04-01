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
        var CollaboratorEmail = this.refs.CollaboratorEmail.value;
        var CollaboratorRole = this.refs.CollaboratorRole.checked;

        try {
            let GetId_promise = await Axios({
                method: 'post',
                url: 'api/ToDoListUser/get',
                data: {
                    email: CollaboratorEmail
                },
            })

            if (!CollaboratorRole) {
                CollaboratorRole = 1;
            }
            else {
                CollaboratorRole = 2;
            }

            if (GetId_promise.data.id != undefined) { // if user exist

                let GetRoleList_promise = await Axios({
                    method: 'get',
                    url: 'api/ToDoListUser/' + id,
                })

                let AlreadyHaveRole = false;
                let currentRole;
                for (var i = 0; i < GetRoleList_promise.data.length; i++) {
                    if (GetRoleList_promise.data[i].user_id == GetId_promise.data.id) {
                        AlreadyHaveRole = true;
                        currentRole = GetRoleList_promise.data[i].role
                        break;
                    }
                }

                if (!AlreadyHaveRole) {
                    let createRole_promise = await Axios({
                        method: 'post',
                        url: '/api/ToDoListUser',
                        data: {
                            to_do_list_id: id,
                            user_id: GetId_promise.data.id,
                            role: CollaboratorRole
                        },
                    })
                    alert("Collaborator added ! ")
                }
                else {
                    if (currentRole != CollaboratorRole) {
                        let ChangeRole_promise = await Axios({
                            method: 'put',
                            url: '/api/ToDoListUser/' + id,
                            data: {
                                user_id: GetId_promise.data.id,
                                role: CollaboratorRole
                            },
                        })
                        alert("Collaborator added ! ")
                    }
                    else {
                        alert("Collaborator has already this role ! ")
                    }
                }
            }
            else {
                alert("User do not exist !")
            }
        }
        catch (e) {
            alert("Error while adding collaborator !")
        }

    }

    async DeleteList(id) {
        // waiting the list is deleted
        try {
            // waiting the list is deleted
            let delete_list = await Axios({
                method: 'delete',
                url: 'http://127.0.0.1:8000/api/ToDoList/' + id
            })

            let delete_roles = await Axios({
                method: 'delete',
                url: 'http://127.0.0.1:8000/api/ToDoListUser/' + id
            })
        }
        catch (e) {
            console.error(e)
        }
        this.props.removeList(this.props.index);
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
                    <input type="radio" name="CollaboratorSetting" value="readOnly" defaultChecked />
                    <label for="readOnly">Read Only</label>
                    <input type="radio" ref="CollaboratorRole" name="CollaboratorSetting" value="edit" />
                    <label for="edit">edit rights</label>
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
    async UNSAFE_componentWillMount() {
        // let TodoLists = [{ TodoNumber: 5, ListName: "Course" },{ TodoNumber: 7, ListName: "online-survey" }]
        // get todolist info here
        try {
            var todolist_promise = await Axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/ToDoList/',
            })
        }
        catch (e) {
            console.error(e)
        }
        let TodoLists = []
        for (var i = 0; i < todolist_promise.data.length; i++) {
            var todolist_info = await Axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/ToDoList/' + todolist_promise.data[i].id,
            })
            var todo_number = 0;
            for (var j = 0; j < todolist_info.data.todo.length; j++) {
                if (todolist_info.data.todo[j].state == 0) { // if the current item isn't done
                    todo_number++;
                }
            }
            TodoLists.push({ TodoNumber: todo_number, ListName: todolist_promise.data[i].title, id: todolist_promise.data[i].id })
        }
        this.setState({ todoLists: TodoLists });
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
