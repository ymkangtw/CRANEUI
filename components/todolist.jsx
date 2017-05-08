import React from 'react';
import ReactDOM from 'react-dom';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import IconClear from 'material-ui/svg-icons/content/clear';

const PaperStyle = {
    //height: 400,
    width: 280,
    margin: 5,
    textAlign: 'center',
    display: 'inline-block',
};

export default class TodoBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { "id": "0001", "task": "task1", "complete": "false" },
                { "id": "0002", "task": "task2", "complete": "false" },
                { "id": "0003", "task": "task3", "complete": "true" },
            ]
        };
        this.handleTaskDelete = this.handleTaskDelete.bind(this);
        this.handleToggleComplete = this.handleToggleComplete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // delete task
    handleTaskDelete(taskId) {
        var data = this.state.data;
        data = data.filter(function (task) {
            return task.id !== taskId;
        });
        this.setState({ data });
    }
    // toggle task status
    handleToggleComplete(taksId) {
        var data = this.state.data;
        for (var i in data) {
            if (data[i].id === taksId) {
                data[i].complete = data[i].complete === "true" ? "false" : "true";
                break;
            }
        }
        this.setState({ data });
    }
    // generate id
    generateId() {
        return Math.floor(Math.random() * 9000) + 1000;
    }
    // add task
    handleSubmit(task) {
        var data = this.state.data;
        var id = this.generateId();
        var complete = "false";
        data = data.concat([{ "id": id, "task": task, "complete": "false" }]);
        this.setState({ data });
    }
    render() {
        var statistics = {
            todoCount: this.state.data.length || 0,
            todoCompleteCount: this.state.data.filter(function (item) {
                return item.complete === "true";
            }).length
        };
        return (
            <Paper style={PaperStyle} zDepth={3}>
                <h1 className="text-center">React Todo</h1>
                <TodoList data={this.state.data}
                    deleteTask={this.handleTaskDelete}
                    toggleComplete={this.handleToggleComplete}
                    todoCount={statistics.todoCount}
                    todoCompleteCount={statistics.todoCompleteCount} />
                <TodoForm submitTask={this.handleSubmit} />
            </Paper>
        );
    }
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        var taskList = this.props.data.map(function (listItem) {
            return (
                <TodoItem
                    taskId={listItem.id}
                    key={listItem.id}
                    task={listItem.task}
                    complete={listItem.complete}
                    deleteTask={this.props.deleteTask}
                    toggleComplete={this.props.toggleComplete} />
            )
        }, this);
        return (
            <List>
                {taskList}
                <TodoFooter todoCount={this.props.todoCount} todoCompleteCount={this.props.todoCompleteCount} />
            </List>
        );
    }
}

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.toggleComplete = this.toggleComplete.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }
    toggleComplete(e) {
        e.preventDefault();
        this.props.toggleComplete(this.props.taskId);
        console.log('click!');
    }
    deleteTask() {
        this.props.deleteTask(this.props.taskId);
    }
    handleMouseOver() {
        ReactDOM.findDOMNode(this.refs.deleteBtn).style.display = "inline";
    }
    handleMouseOut() {
        ReactDOM.findDOMNode(this.refs.deleteBtn).style.display = "none";
    }
    render() {
        var task = this.props.task;
        //var classes = "list-group-item"
        var itemChecked;
        if (this.props.complete === "true") {
            task = <s>{task}</s>
            itemChecked = true;
            //classes += " list-group-item-success"
        } else {
            itemChecked = false;
        }
        return (
            <ListItem 
                onMouseOver={this.handleMouseOver} 
                onMouseOut={this.handleMouseOut} 
                rightIcon={<IconClear onClick={this.deleteTask} ref="deleteBtn" />}
                primaryText={task}
                onClick={this.toggleComplete}>
                {/*<Checkbox checked={itemChecked} onClick={this.toggleComplete} />*/}
            </ListItem>
        );
    }
}

class TodoFooter extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ListItem>{this.props.todoCompleteCount}已完成 / {this.props.todoCount}總數</ListItem>
        );
    }
}

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.submitTask = this.submitTask.bind(this);
    }
    submitTask(e) {
        e.preventDefault();
        var task = ReactDOM.findDOMNode(this.refs.task).value.trim();
        if (!task) {
            return;
        }
        this.props.submitTask(task);
        ReactDOM.findDOMNode(this.refs.task).value = "";
    }
    render() {
        return (
            <div>
                <hr />
                <form className="form-horizontal" onSubmit={this.submitTask}>
                    <div className="form-group">
                        <label for="task" className="col-md-2 control-label">Task</label>
                        <div className="col-md-10">
                            <input type="text" id="task" ref="task" className="form-control" placeholder="To do something..."></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-right">
                            <input type="submit" value="Save Task" className="btn btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

