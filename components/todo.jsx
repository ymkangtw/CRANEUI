import React from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';

var todoItems = [];
todoItems.push({ index: 1, value: "learn react", done: false });
todoItems.push({ index: 2, value: "Go shopping", done: true });
todoItems.push({ index: 3, value: "buy flowers", done: true });

class TodoList extends React.Component {
    render() {
        var items = this.props.items.map((item, index) => {
            return (
                <TodoListItem key={index} item={item} index={index}
                    removeItem={this.props.removeItem}
                    markTodoDone={this.props.markTodoDone} />
            );
        });
        return (
            <ul> {items} </ul>
        );
    }
}

class TodoListItem extends React.Component {
    constructor(props) {
        super(props);
        this.onClickClose = this.onClickClose.bind(this);
        this.onClickDone = this.onClickDone.bind(this);
    }
    onClickClose() {
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
            <li>
                <div>
                    <span aria-hidden="true" onClick={this.onClickDone}></span>
                    {this.props.item.value}
                    <button type="button" onClick={this.onClickClose}>&times;</button>
                </div>
            </li>
        );
    }
}

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.itemName).focus();
    }
    onSubmit(event) {
        event.preventDefault();
        var input = ReactDOM.findDOMNode(this.refs.itemName);
        var newItemValue = input.value;
        //console.log(newItemValue);
        if (newItemValue) {
            this.props.addItem({ newItemValue });
            input.value = '';
        }
    }
    render() {
        return (
            <form onSubmit={this.onSubmit} >
                <input type="text" ref="itemName" placeholder="add a new todo..." />
                <RaisedButton label="SET" primary={true} onClick={this.onSubmit}/>
            </form>
        );
    }
}

class TodoHeader extends React.Component {
    render() {
        return <h1>Todo list</h1>;
    }
}

export default class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.markTodoDone = this.markTodoDone.bind(this);
        //this.state = { todoItems: todoItems };
        this.state = { todoItems: [] };
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
        var todo = todoItems[itemIndex];
        todoItems.splice(itemIndex, 1);
        todo.done = !todo.done;
        todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
        this.setState({ todoItems: todoItems });
    }
    render() {
        return (
            <div id="main">
                <TodoHeader />
                <TodoList items={this.props.initItems}
                    removeItem={this.removeItem}
                    markTodoDone={this.markTodoDone} />
                <TodoForm addItem={this.addItem} />
            </div>
        );
    }
}