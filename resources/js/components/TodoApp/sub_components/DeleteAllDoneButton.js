import React from 'react';
import { Button } from 'reactstrap'

class DeleteAllDoneButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Button onClick={() => { this.props.removeAllDoneItem() }}>deleteAllDone</Button>
    )
  }
}
export default DeleteAllDoneButton;