import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class TodoListPreviewItem extends Component {
    constructor(props) {
        super(props);
    }

    redirectToList(id){
        document.location.href = "/todolist/"+ id;
    }
    render() {
        return (
            <div className="card" onClick={() => this.redirectToList(this.props.data.id)} style={{cursor:'pointer'}}>
                <h1>{this.props.data.ListName}</h1>
                <h2>{this.props.data.TodoNumber} Todos</h2>
            </div>
        )
    };
}


class TodoListPreview extends Component {
    constructor(props) {
        super(props);
        this.state = { todoLists: [] };
    }
    UNSAFE_componentWillMount(){
        let TodoLists = [{ TodoNumber: 5, ListName: "Course" },{ TodoNumber: 7, ListName: "online-survey" }]
        // get todolist info here
        this.setState({ todoLists: TodoLists });
    }

    render() {
        var items = [];
        for (var i = 0;i<this.state.todoLists.length;i++){
            items.push({id: i,data: this.state.todoLists[i]})
        }
        console.log(items)
        return (
            <div>
            { items.map(TodoListPreviewItems => <TodoListPreviewItem key={TodoListPreviewItems.id} data={TodoListPreviewItems.data}/>) }
            </div>
        )
    };
}

export default TodoListPreview;



if (document.getElementById('todolist-preview')) {
    ReactDOM.render(<TodoListPreview />, document.getElementById('todolist-preview'));
}
