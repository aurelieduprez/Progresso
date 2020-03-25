import React from 'react';
import { Button } from 'reactstrap'

class TodoListModeButton extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div id="ModeButtonDiv">
          <Button onClick={() => { this.props.changeMode("all") }}>All</Button>
          <Button onClick={() => { this.props.changeMode("TodoOnly") }}>TodoOnly</Button>
          <Button onClick={() => { this.props.changeMode("DoneOnly") }}>DoneOnly</Button>
        </div>
      )
  
  
    }
  }

  export default TodoListModeButton;