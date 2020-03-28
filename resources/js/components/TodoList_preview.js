import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';
import Axios from 'axios';

class TodoListPreviewItem extends Component {
    constructor(props) {
        super(props);
    }

    redirectToList(id){
        document.location.href = "/todolist/"+ id;
    }

    async DeleteList(id){
        // waiting the list is deleted
    try{
      let promise = await Axios({
        method: 'delete',
        url: 'http://127.0.0.1:8000/api/ToDoList/' + id,
        headers: {}
      })
    }
    catch(e){
        console.error(e)
    }
      this.props.removeList(this.props.index);
    }
    render() {
        return (
            <div className="card">
                <div className="card-body" onClick={() => this.redirectToList(this.props.data.id)} style={{cursor:'pointer'}}>
                <h1>{this.props.data.ListName}</h1>
                <h2>{this.props.data.TodoNumber} Todos</h2>
                </div>
                <Button onClick={() => this.DeleteList(this.props.data.id)}> Delete </Button>
            </div>
        )
    };
}


class TodoListPreview extends Component {
    constructor(props) {
        super(props);
        this.state = { todoLists: [] };
        this.removeList = this.removeList.bind(this);
    }
    async UNSAFE_componentWillMount(){
       // let TodoLists = [{ TodoNumber: 5, ListName: "Course" },{ TodoNumber: 7, ListName: "online-survey" }]
        // get todolist info here
        try{
        var todolist_promise = await Axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/ToDoList/',
          })
          console.log(todolist)
        }
        catch(e){
            console.log(e)
        }
        let TodoLists = []
        for(var i = 0; i < todolist_promise.data.length; i++){
            TodoLists.push({TodoNumber: 0, ListName: todolist_promise.data[i].title , id: todolist_promise.data[i].id })
        }
        this.setState({ todoLists: TodoLists });
    }

    removeList(index){
        let todoLists = this.state.todoLists
        todoLists.splice(index, 1);
        this.setState({ todoLists: todoLists });
    }

    render() {
        var items = [];
        for (var i = 0;i<this.state.todoLists.length;i++){
            items.push({id: i,data: this.state.todoLists[i]})
        }
        console.log(items)
        return (
            <div>
            { items.map(TodoListPreviewItems => <TodoListPreviewItem removeList={this.removeList} index={TodoListPreviewItems.id} key={TodoListPreviewItems.id} data={TodoListPreviewItems.data}/>) }
            <Button onClick={()=>{document.location.href = "/todolist/new"}}>+</Button>
            </div>
        )
    };
}

export default TodoListPreview;



if (document.getElementById('todolist-preview')) {
    ReactDOM.render(<TodoListPreview />, document.getElementById('todolist-preview'));
}
