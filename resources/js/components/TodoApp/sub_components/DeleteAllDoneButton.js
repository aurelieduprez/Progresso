import React from 'react';
import { Button } from 'reactstrap'

class DeleteAllDoneButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Button className="button-action" onClick={() => { this.props.removeAllDoneItem() }}>Delete all Done tasks</Button>
    )
  }
}
export default DeleteAllDoneButton;