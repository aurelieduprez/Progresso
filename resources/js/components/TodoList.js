import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Input } from 'reactstrap'
import Axios from 'axios';
var todoItems = [];

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
              <Button className="glyphicon glyphicon-ok icon" aria-hidden="true" onClick={this.onClickDone}>done</Button>
              <Button type="button" className="close" onClick={this.onClickDelete}>&times;</Button>
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
    return (<Input placeholder={"titre"} value={this.props.title} onChange={e => this.props.handleChangeTitle(e.target.value)}></Input>)
  }
}

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

class SaveTodoList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Button onClick={this.props.save}>Save</Button>
    )
  }
}

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


class TodoApp extends React.Component {
  // Define attribute & function of TodoApp
  constructor(props) {
    super(props);
    this.isNew = true;
    this.TodoListID;
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.removeAllDoneItem = this.removeAllDoneItem.bind(this);
    this.UncheckALL = this.UncheckALL.bind(this);
    this.state = { todoItems: todoItems, mode: "all", ListName: "" };
  }

  saveItem() {
    if (this.isNew) {
      Axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/ToDoList',
        data: {
          title: this.state.ListName,
          state: '1',
          closed: '12-03-22'
        },
        headers: {}
      })
    }
    else {
      if (this.state.ListName !== "") {
        Axios({
          method: 'put',
          url: 'http://127.0.0.1:8000/api/ToDoList/' + this.TodoListID,
          data: {
            title: this.state.ListName,
            state: '1',
            closed: '12-03-22'
          },
          headers: {}
        })
      }
    }
  }

  componentDidUpdate() {
    if (!this.isNew) {
      this.saveItem()
    }
  }


  handleChangeTitle(title) {
    this.setState({ ListName: title });
  }
  changeMode(NewMode) {
    this.setState({ mode: NewMode });
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

  removeAllDoneItem() {
    console.log("remove all called")
    console.log(" i = " + i + "todoItems length = " + todoItems.length)
    console.log("todoitem : " + todoItems)
    for (var i = 0; i < todoItems.length; i++) {
      console.log("for : " + i)
      console.log("todoItems[i] : " + todoItems[i])
      if (todoItems[i].done == true && todoItems[i].title == undefined) {
        todoItems.splice(i, 1)
      }
    }
    this.setState({ todoItems: todoItems });
  }

  UncheckALL() {
    console.log("remove all called")
    console.log(" i = " + i + "todoItems length = " + todoItems.length)
    console.log("todoitem : " + todoItems)
    for (var i = 0; i < todoItems.length; i++) {
      console.log("for : " + i)
      console.log("todoItems[i] : " + todoItems[i])
      if (todoItems[i].done == true && todoItems[i].title == undefined) {
        let todo = todoItems[i]
        todoItems.splice(i, 1);
        // insert a new one with same value at the end of the array
        todo.done = false;
        todoItems.unshift(todo);
        this.setState({ todoItems: todoItems });
      }
    }
    // this.setState({ todoItems: todoItems });
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

  async componentWillMount() {
    var pageURL = window.location.href;
    var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
    this.TodoListID = lastURLSegment
    if (lastURLSegment == "new") { // if it's a new todo list
      todoItems.push({ index: 1, value: "Done", title: true, done: true });
      this.setState({ todoItems: todoItems });
    }
    else {
      this.isNew = false; // change isNew boolean
      var todolist = await Axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/ToDoList/' + this.TodoListID,
      })
      // update todolist title 
      this.setState({ ListName: todolist.data.title });
    }
  }

  render() {
    return (
      <div id="main">
        <TodoListTitle handleChangeTitle={this.handleChangeTitle} title={this.state.ListName} />
        {!this.isNew && 
        <Button>DELETE</Button>
        }
        <TodoListModeButton changeMode={this.changeMode} />
        {this.state.mode == "all" &&
          <>
            <h2>Todo</h2>
            <UncheckALL UncheckALL={this.UncheckALL} />
            <DeleteAllDoneButton removeAllDoneItem={this.removeAllDoneItem} />
          </>
        }
        {this.state.mode == "TodoOnly" &&
          <h2>Todo</h2>
        }
        {this.state.mode == "DoneOnly" &&
          <>
            <UncheckALL UncheckALL={this.UncheckALL} />
            <DeleteAllDoneButton removeAllDoneItem={this.removeAllDoneItem} />
          </>
        }

        <TodoList mode={this.state.mode} items={this.props.initItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone} />
        <NewTodo addItem={this.addItem} />
        {this.isNew && 
        <SaveTodoList save={this.saveItem} />
        }
      </div>
    );
  }
}
if (document.getElementById('todo-list')) {
  ReactDOM.render(<TodoApp initItems={todoItems} />, document.getElementById('todo-list'));
}