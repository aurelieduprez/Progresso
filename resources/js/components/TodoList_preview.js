import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class TodoListPreviewItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="card-body">
                <h1>{this.props.data.ListName}</h1>
                <h2>{this.props.data.TodoNumber} Todos</h2>
            </div>
        )
    };
}


class TodoListPreview extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var items = [];
        for (var i = 0;i<this.props.data.length;i++){
            items.push({id: i,data: this.props.data[i]})
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

var data = [{ TodoNumber: 5, ListName: "Course" },{ TodoNumber: 7, ListName: "online-survey" }]

if (document.getElementById('todolist-preview')) {
    ReactDOM.render(<TodoListPreview data={data} />, document.getElementById('todolist-preview'));
}
