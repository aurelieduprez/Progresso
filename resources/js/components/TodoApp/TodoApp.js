import React from 'react';
import ReactDOM from 'react-dom';
import TodoListTitle from './sub_components/TodoListTitle'
import DeleteListButton from './sub_components/DeleteListButton'
import TodoListModeButton from './sub_components/TodoListModeButton'
import UncheckALL from './sub_components/UncheckALL'
import DeleteAllDoneButton from './sub_components/DeleteAllDoneButton'
import TodoList from './sub_components/TodoList'
import NewTodo from './sub_components/NewTodo'
import SaveTodoList from './sub_components/SaveTodoList'
import Axios from 'axios';
var todoItems = [];

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

  async saveItem() {
    if (this.isNew) {
      let createList_promise = await Axios({
        method: 'post',
        url: '/api/ToDoList',
        data: {
          title: this.state.ListName,
          closed: '0',
          content: this.state.todoItems
        },
      })
      console.log(createList_promise)
      try {
        let createRole_promise = await Axios({
          method: 'post',
          url: '/api/ToDoListUser',
          data: {
            to_do_list_id: createList_promise.data.id,
            role :"3"
          },
        })
      }
      catch (e) { console.log(e) }
      console.log(this.state.todoItems)
      document.location.href = "/todolist/" + createList_promise.data.id;
    }
    else {
      if (this.state.ListName !== "") {
        Axios({
          method: 'put',
          url: 'http://127.0.0.1:8000/api/ToDoList/' + this.TodoListID,
          data: {
            title: this.state.ListName,
            closed: '0',
            content: this.state.todoItems
          },
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

  async addItem(todoItem) {

    if (!this.isNew) {
      var createItem_promise = await Axios({
        method: 'post',
        url: '/api/ToDoList/' + this.TodoListID + '/items',
        data: {
          id: this.TodoListID,
          content: todoItem.newItemValue
        },
      })
      todoItems.unshift({
        id: createItem_promise.data,
        index: todoItems.length + 1,
        value: todoItem.newItemValue,
        done: false
      });
    }
    else {
      todoItems.unshift({
        index: todoItems.length + 1,
        value: todoItem.newItemValue,
        done: false
      });
    }

    this.setState({ todoItems: todoItems });
  }
  async removeItem(itemIndex) {
    if (!this.isNew) {
      var deleteItem_promise = await Axios({
        method: 'delete',
        url: 'http://127.0.0.1:8000/api/ToDoList/items/' + todoItems[itemIndex].id,
      })
    }
    console.warn(todoItems[itemIndex].id)
    todoItems.splice(itemIndex, 1);
    this.setState({ todoItems: todoItems });
  }

  async removeAllDoneItem() {
    let todoItems_list = this.state.todoItems
    var Done_nb = 0; // number of done task to delete
    let Done_index; // index in the list of the first done item
    for (var i = 0; i < todoItems.length; i++) {
      console.log(" i = " + i + "todoItems length = " + todoItems_list.length)
      if (todoItems_list[i].done == true && todoItems_list[i].title == undefined) {
        Done_nb++;
      }
      if (todoItems_list[i].title) { // if is done title
        Done_index = i + 1; // first done task is 1 index after the title
      }
    }
    if (Done_nb > 0) // if there at least one done task to delete
      for (var i = 0; i < Done_nb; i++) {
        if (!this.isNew) {
          var deleteItem_promise = await Axios({
            method: 'delete',
            url: 'http://127.0.0.1:8000/api/ToDoList/items/' + todoItems[Done_index+i].id,
          })
        }
      }
    todoItems_list.splice(Done_index, Done_nb) // delete all done task
    this.setState({ todoItems: todoItems_list });
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
      try {
        var todolist = await Axios({
          method: 'get',
          url: 'http://127.0.0.1:8000/api/ToDoList/' + this.TodoListID,
        })
        console.log(todolist.data)
      }
      catch (e) { // if request fail
        // redirect user to /todolist/new
        document.location.href = "/todolist/new";
      }
      // setup vars
      var contentList = [] // list of our content to push to todoItems state
      var todos_data = todolist.data.todo; // shortcut for easier reading

      // check for any not done todo
      for (let i = 0; i < todos_data.length; i++) {
        if (todos_data[i].state == 0) { // if the current item isn't done
          let item = { id: todos_data[i].id, index: i, value: todos_data[i].content, done: todos_data[i].state }
          todoItems.push(item); // add it to the todoItems array (state)
        }
      }
      // add "done" separator to the todoItems array (state)
      todoItems.push({ index: contentList.length + 1, value: "Done", title: "true", done: "true" });

      // check for any done todo
      for (let i = 0; i < todos_data.length; i++) {
        let index = i + contentList.length;
        if (todos_data[i].state == 1) {// if the current item is done
          let item = { id: todos_data[i].id, index: index, value: todos_data[i].content, done: todos_data[i].state }
          todoItems.push(item); // add it to the todoItems array (state)
        }
      }

      // update todolist title 
      this.setState({ ListName: todolist.data.title });
      //  update todolist content 
      this.setState({ todoItems: todoItems });
    }
  }

  render() {
    return (
      <div id="main" className="card">
        <TodoListTitle handleChangeTitle={this.handleChangeTitle} title={this.state.ListName} />
        {!this.isNew &&
          <DeleteListButton TodoListID={this.TodoListID}></DeleteListButton>
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