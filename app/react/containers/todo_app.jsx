import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";

import { addTodo, fetchTodos, completeTodo, setVisibilityFilter, VisibilityFilters } from "../actions/todo";
import AddTodo from "../components/todos/add_todo.jsx";
import TodoList from "../components/todos/todo_list.jsx";
import Footer from "../components/todos/footer.jsx";
import Spinner from "../components/lib/spinner.jsx";

class TodoApp extends Component {

	componentDidMount () {
		const {dispatch} = this.props;
		dispatch(fetchTodos());
	}

	render () {
		const {dispatch, visibleTodos, visibilityFilter, isProcessing} = this.props;

		return (
			<div>
				<Spinner show={isProcessing} />
				<Row>
					<Col xs={8}>
						<AddTodo
							onAddClick={text =>
								dispatch(addTodo(text))
							} />
						<TodoList
							todos={visibleTodos}
							onTodoClick={index =>
								dispatch(completeTodo(index))
							} />
						<Footer
							filter={visibilityFilter}
							onFilterChange={nextFilter =>
								dispatch(setVisibilityFilter(nextFilter))
							} />
					</Col>
				</Row>
			</div>
		);
	}
}

TodoApp.propTypes = {
	visibleTodos: PropTypes.arrayOf(PropTypes.shape({
		text: PropTypes.string.isRequired,
		completed: PropTypes.bool.isRequired
	})),
	visibilityFilter: PropTypes.oneOf([
		"SHOW_ALL",
		"SHOW_COMPLETED",
		"SHOW_ACTIVE"
	]).isRequired
};

function selectTodos(todos, filter) {
	switch (filter) {
		case VisibilityFilters.SHOW_ALL:
			return todos;
		case VisibilityFilters.SHOW_COMPLETED:
			return todos.filter(todo => todo.completed);
		case VisibilityFilters.SHOW_ACTIVE:
			return todos.filter(todo => !todo.completed);
	}
}

function select(state) {
	const todo = state.todo;
	return {
		isProcessing: todo.isProcessing,
		visibleTodos: selectTodos(todo.todos.toArray(), todo.visibilityFilter),
		visibilityFilter: todo.visibilityFilter
	};
}

export default connect(select)(TodoApp);
