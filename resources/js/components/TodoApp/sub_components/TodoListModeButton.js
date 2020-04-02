import React from 'react';
import { Button } from 'reactstrap'

class TodoListModeButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="display-mode no-transition">
        Display Mode : 
        <div id="ModeButtonDiv">
          <Button className="ModeButton" onClick={() => { this.props.changeMode("all") }}>All</Button>
          <Button className="ModeButton" onClick={() => { this.props.changeMode("TodoOnly") }}>Todo Only</Button>
          <Button className="ModeButton" onClick={() => { this.props.changeMode("DoneOnly") }}>Done Only</Button>
        </div>
      </div>
    )


  }
}

export default TodoListModeButton;