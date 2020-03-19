import React from 'react';
import ReactDOM from 'react-dom';

var todoItems = [];

class TodoList extends React.Component {

  render() {
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
}

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
        <li className="list-group-item ">
          <div className={todoClass}>
              {this.props.item.value}
                <button className="glyphicon glyphicon-ok icon" aria-hidden="true" onClick={this.onClickDone}>done</button>
                <button type="button" className="close" onClick={this.onClickDelete}>&times;</button>
          </div>
        </li>
        }
      </>
    );
  }
}

class NewTodo extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.refs.itemName.focus();
  }
  onSubmit(event) {
    event.preventDefault();
    var newItemValue = this.refs.itemName.value;

    if (newItemValue) {
      this.props.addItem({ newItemValue });
      this.refs.NewItemForm.reset();
    }
  }
  render() {
    return (
      <form ref="NewItemForm" onSubmit={this.onSubmit} className="form-inline">
        <input type="text" ref="itemName" className="form-control" placeholder="add a new todo..." />
        <button type="submit" className="btn btn-default">Add</button>
      </form>
    );
  }
}

class TodoListTitle extends React.Component {

  render() {
    return <h1>{this.props.name}</h1>;
  }
}

class SaveTodoList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <button onClick={this.props.save}>Save</button>
    )
  }
}

class TodoApp extends React.Component {
  // Define attribute & function of TodoApp
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.state = { todoItems: todoItems };
  }

  saveItem(){
    console.log(this.state.todoItems)
  }

  addItem(todoItem) {
    todoItems.unshift({
      index: todoItems.length + 1,
      value: todoItem.newItemValue,
      done: false
    });
    this.setState({ todoItems: todoItems });
  }
  removeItem(itemIndex) {
    todoItems.splice(itemIndex, 1);
    this.setState({ todoItems: todoItems });
  }
  markTodoDone(itemIndex) {
    // delete items
    var todo = todoItems[itemIndex];
    todoItems.splice(itemIndex, 1);
    // insert a new one with same value at the end of the array
    todo.done = !todo.done;
    todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
    this.setState({ todoItems: todoItems });
  }
  componentDidMount(){
    if(todoItems.length == 0){
      todoItems.push({ index: 1, value: "Done", title: true });
      this.setState({ todoItems: todoItems });
    }
  }

  render() {
    return (
      <div id="main">
        <TodoListTitle name="list-name" />
        <h2>Todo</h2>
        <TodoList items={this.props.initItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone} />
        <NewTodo addItem={this.addItem} />
        <SaveTodoList save={this.saveItem} />
      </div>
    );
  }
}

ReactDOM.render(<TodoApp initItems={todoItems} />, document.getElementById('todo-list'));