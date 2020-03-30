import React from 'react';
import { Button } from 'reactstrap'

class TodoListItem extends React.Component {
    constructor(props) {
      super(props);
      this.onClickDelete = this.onClickDelete.bind(this);
      this.onClickDone = this.onClickDone.bind(this);
    }
    onClickDelete() {
      var index = parseInt(this.props.index);
      this.props.removeItem(index);
    }
    onClickDone() {
      var index = parseInt(this.props.index);
      this.props.markTodoDone(index);
    }
    render() {
      var todoClass = this.props.item.done ?
        "done" : "undone";
      return (
        <>
          {this.props.item.title != undefined &&
            <h2>{this.props.item.value}</h2>
          }
          {this.props.item.title == undefined &&
            <li className="list-group-item card">
              <div className={todoClass}>
                {this.props.item.value}
                <Button className="glyphicon glyphicon-ok icon" aria-hidden="true" onClick={this.onClickDone}>done</Button>
                <Button type="button" className="close" onClick={this.onClickDelete}>&times;</Button>
              </div>
            </li>
          }
        </>
      );
    }
  }

  export default TodoListItem;