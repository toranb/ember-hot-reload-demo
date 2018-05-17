import Component from '@ember/component';
import { connect } from 'ember-redux';
import { getTodos } from '../reducers/todos/selectors';

const stateToComputed = state => ({
  todos: getTodos(state)
});

const TodoListComponent = Component.extend({
  tagName: 'ul',
  classNames: 'todo-list'
});

export default connect(stateToComputed)(TodoListComponent);
