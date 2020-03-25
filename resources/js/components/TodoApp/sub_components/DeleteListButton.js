import React from 'react';
import { Button } from 'reactstrap'
import Axios from 'axios'

class DeleteListButton extends React.Component {
    constructor(props) {
      super(props);
    }
  
    async removeList() {
      // waiting the list is deleted
      let promise = await Axios({
        method: 'delete',
        url: 'http://127.0.0.1:8000/api/ToDoList/' + this.props.TodoListID,
        headers: {}
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