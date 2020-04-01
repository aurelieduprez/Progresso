import React from 'react';
import { Button } from 'reactstrap'

class UncheckALL extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Button onClick={() => { this.props.UncheckALL() }}>UncheckALL</Button>
    )
  }
}

export default UncheckALL;