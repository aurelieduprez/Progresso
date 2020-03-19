import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class TodoListPreview extends Component{
    constructor(props){
        super(props);
    }
    render(){
        console.log(this.props.data)
    return (
        <div className="container">
            shit
        </div>
    )};
}

export default TodoListPreview;

if (document.getElementById('todolist-preview')) {
    ReactDOM.render(<TodoListPreview />, document.getElementById('todolist-preview'));
}
