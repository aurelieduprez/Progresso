import React from 'react';
import TodoListItem from './TodoListItem'
class TodoList extends React.Component {

    render() {
      if (this.props.mode == "all") {
        var items = this.props.items.map((item, index) => {
          return (
            <div id="todolist">
              <TodoListItem key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
            </div>
          );
        });
        return (
          <ul className="list-group"> {items} </ul>
        );
      }
      else if (this.props.mode == "DoneOnly") {
        var items = this.props.items.map((item, index) => {
          if (item.done) {
            return (
              <div id="todolist">
                <TodoListItem key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
              </div>
            );
          }
        });
        return (
          <ul className="list-group"> {items} </ul>
        );
      }
      else if (this.props.mode == "TodoOnly") {
        var items = this.props.items.map((item, index) => {
          if (!item.done) {
            return (
              <div id="todolist">
                <TodoListItem key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
              </div>
            );
          }
        });
        return (
          <ul className="list-group"> {items} </ul>
        );
      }
    }
  }

  export default TodoList;