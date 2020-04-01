import React from 'react';
import { Button } from 'reactstrap'
import Axios from 'axios'

class DeleteListButton extends React.Component {
  constructor(props) {
    super(props);
  }

  async removeList() {
    // delete the list
    let delete_list = await Axios({
      method: 'delete',
      url: 'http://127.0.0.1:8000/api/ToDoList/' + this.props.TodoListID
    })
    // clear all roles about this list
    let delete_roles = await Axios({
      method: 'delete',
      url: 'http://127.0.0.1:8000/api/ToDoListUser/' + this.props.TodoListID
    })
    // redirect user to /home
    document.location.href = "/home";
  }

  render() {
    return (
      <Button onClick={() => { this.removeList() }}>Delete list</Button>
    )
  }
}

export default DeleteListButton;