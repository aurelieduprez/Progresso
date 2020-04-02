import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';
import Axios from 'axios';

class TodoListCollaboratorItem extends Component {
    constructor(props) {
        super(props);
        this.state = { role: "0", index: "0" }
    }

    async changeRole(TodoListID, UserID, role) {

        let ChangeRole_promise = await Axios({
            method: 'put',
            url: '/api/ToDoListUser/' + TodoListID,
            data: {
                user_id: UserID,
                role: role
            },
        })
        if (role == "0") {
            this.props.removeCollab(this.state.index);
        }
        else {
            this.setState({ role: role })
        }
    }

    componentWillMount() {
        this.setState({ role: this.props.role, index: this.props.index })
    }

    render() {
        var role_text
        switch (this.state.role) {
            case "1":
                role_text = "read right";
                break;
            case "2":
                role_text = "write/read right";
                break;
            default:
                role_text = "error please refresh..."
        }

        return (
            <span>
                <h4>{this.props.name} has {role_text}</h4>
                {this.state.role == 1 &&
                    <Button onClick={() => { this.changeRole(this.props.todolistid, this.props.userid, "2") }}>Give write right</Button>
                }
                {this.state.role == 2 &&
                    <Button onClick={() => { this.changeRole(this.props.todolistid, this.props.userid, "1") }}>Remove write right</Button>
                }
                <Button onClick={() => { this.changeRole(this.props.todolistid, this.props.userid, "0") }}>Remove collaborator</Button>
            </span>
        )
    }

}

class TodoListPreviewItem extends Component {
    constructor(props) {
        super(props);
        this.state = { CollabLists: [], role_text: "" };
        this.removeCollab = this.removeCollab.bind(this);
        this.CurrentUserRole = "0";
    }

    redirectToList(id) {
        document.location.href = "/todolist/" + id;
    }

    removeCollab(index) {
        let CollabLists = this.state.CollabLists
        CollabLists.splice(index, 1);
        this.setState({ CollabLists: CollabLists });
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
                            role: CollaboratorRole,
                            email: CollaboratorEmail
                        },
                    })
                    alert("Collaborator added ! ") // success
                    window.location.reload()
                }
                else { // if he did have a role in this todolist
                    if (currentRole != CollaboratorRole && currentRole != "3") { // check if he has the same role that we want to add to him
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
                        window.location.reload()
                    }
                    else if (currentRole == "3") {
                        // alert user that he  can't change his role 
                        alert("You can't change your role ! ")
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

    async QuitList(TodoListID) {

        let ChangeRole_promise = await Axios({
            method: 'put',
            url: '/api/ToDoListUser/' + TodoListID,
            data: {
                user_id: "CurrentUser",
                role: "0"
            },
        })

        this.props.removeList(this.props.index);
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

    async componentWillMount() {
        try {
            var CurrentUserRole_promise = await Axios({
                method: 'get',
                url: 'api/ToDoListUser/' + this.props.data.id + '/role'
            })
            this.CurrentUserRole = CurrentUserRole_promise.data;
        }
        catch (e) {
            console.error("error while trying to get current user role ! " + e)
        }
        console.warn("role : " + this.CurrentUserRole)

        var text
        switch (this.CurrentUserRole) {
            case 1:
                text = "You have read right on this todolist ! ";
                this.setState({ role_text: text })
                break;
            case 2:
                text = "You have write/read right on this todolist ! ";
                this.setState({ role_text: text })
                break;
            case 3:
                text = "You are the owner of this todolist !";
                this.setState({ role_text: text })
                break;
            default:
                text = "error please refresh..."
                this.setState({ role_text: text })
        }

        if (this.CurrentUserRole == "3") {
            var TodolistUser = await Axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/ToDoList/' + this.props.data.id + '/user'
            })
            var TodolistUser_clean = [];
            for (var i = 0; i < TodolistUser.data.length; i++) {
                if (TodolistUser.data[i].role != "3" && TodolistUser.data[i].role != "0") { // do not display the owner of the list and people that got removed
                    TodolistUser_clean.push({ data: TodolistUser.data[i] })
                }
            }
            for (var i = 0; i < TodolistUser_clean.length; i++) {
                let CollabLists = this.state.CollabLists;
                CollabLists.push({ index: i, data: TodolistUser_clean[i].data })
                this.setState({ CollabLists: CollabLists })
            }
        }
    }

    render() {
        var items = [];
        for (var i = 0; i < this.state.CollabLists.length; i++) {
            items.push({ index: i, data: this.state.CollabLists[i].data })
        }
        if (this.CurrentUserRole != "0") { // if user has access to the todolist 
            return (
                <div className="card card-single-list">
                    <div className="card-body" onClick={() => this.redirectToList(this.props.data.id)} style={{ cursor: 'pointer' }}>
                        <h1>{this.props.data.ListName}</h1>
                        <h2>{this.props.data.TodoNumber} Todos</h2>
                    </div>
                    <h4>{this.state.role_text}</h4>
                    {this.CurrentUserRole == "3" &&
                        <span>
                            <input type="text" ref="CollaboratorEmail" className="form-control" placeholder="add a new collaborator..." />
                            <input type="radio" name={"CollaboratorSetting" + this.props.index} value="readOnly" defaultChecked />
                            <label for="readOnly">Read Only</label>
                            <input type="radio" ref="CollaboratorRole" name={"CollaboratorSetting" + this.props.index} value="edit" />
                            <label for="edit">Read/Write</label>

                            <Button onClick={() => this.AddCollaborator(this.props.data.id)}>Add Collaborator </Button>

                            {items.map(TodoListCollaboratorItems =>
                                <TodoListCollaboratorItem index={TodoListCollaboratorItems.index} key={TodoListCollaboratorItems.index}
                                    removeCollab={this.removeCollab} userid={TodoListCollaboratorItems.data.user_id} todolistid={this.props.data.id}
                                    name={TodoListCollaboratorItems.data.name} role={TodoListCollaboratorItems.data.role} />)}

                        </span>
                    }
                    {this.CurrentUserRole == "3" &&
                        <Button onClick={() => this.DeleteList(this.props.data.id)}> Delete this list </Button>
                    }
                    {this.CurrentUserRole == "2" &&
                        <Button onClick={() => this.QuitList(this.props.data.id)}>Quit list</Button>
                    }
                    {this.CurrentUserRole == "1" &&
                        <Button onClick={() => this.QuitList(this.props.data.id)}>Quit list</Button>
                    }
                </div>
            )
        }
        else { return null } // if current user have been removed from the list
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
        // get all todolist where the current user has access
        var todolist_promise = await Axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/ToDoList/',
        })

        let TodoLists = []
        console.warn(todolist_promise)
        // for all todolist get the number of remaining todos
        for (var i = 0; i < todolist_promise.data.length; i++) {
            // get content of the todolist
            var todolist_info = await Axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/ToDoList/' + todolist_promise.data[i].id,
            })
            console.warn(todolist_info)
            if (todolist_info.data != "Access Denied") {
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
                <Button onClick={() => { document.location.href = "/todolist/new" }}>New list</Button>
            </div>
        )
    };
}

export default TodoListPreview;



if (document.getElementById('todolist-preview')) {
    ReactDOM.render(<TodoListPreview />, document.getElementById('todolist-preview'));
}
