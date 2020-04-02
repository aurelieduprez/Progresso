import React from 'react';
import { Button } from 'reactstrap'

class UncheckALL extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Button className="button-action" onClick={() => { this.props.UncheckALL() }}>Uncheck all Done tasks</Button>
    )
  }
}

export default UncheckALL;