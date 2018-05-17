import Component from '@ember/component';
import { connect } from 'ember-redux';
import { getFilter, getTodosCount, getCompletedCount, getAllTodosCount } from '../reducers/todos/selectors';
import { clearCompleted, showAll, showActive, showCompleted } from '../actions/todos';

const stateToComputed = state => ({
  filter: getFilter(state),
  allCount: getAllTodosCount(state),
  todosCount: getTodosCount(state),
  completedCount: getCompletedCount(state)
});

const dispatchToActions = {
  clearCompleted,
  showAll,
  showActive,
  showCompleted
};

const FooterComponent = Component.extend({
  tagName: 'footer',
  classNames: 'footer'
});

export default connect(stateToComputed, dispatchToActions)(FooterComponent);
