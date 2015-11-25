import Promise from "bluebird";

const TODOS = [
  {text: "Hello React", completed: false},
  {text: "Hello Redux", completed: false}
];

export default {

	add (text) {
		return Promise.delay(300).then(() => {
			let todo = {text: text, completed: false};
			TODOS.push(todo);
			return todo;
		});
	},

	get () {
		return Promise.delay(500).then(() =>  TODOS);
	},

	complete (index) {
		return Promise.delay(300)
      .then(() => {
	TODOS[index] = Object.assign({}, TODOS[index], {completed: true});
	return TODOS[index];
      });
	}
};
