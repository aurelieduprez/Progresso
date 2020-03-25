import React from 'react';
import { Input } from 'reactstrap'

class TodoListTitle extends React.Component {

    render() {
      return (<Input placeholder={"titre"} value={this.props.title} onChange={e => this.props.handleChangeTitle(e.target.value)}></Input>)
    }
  }

  export default TodoListTitle;