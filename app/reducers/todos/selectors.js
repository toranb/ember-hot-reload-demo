import _ from 'lodash';
import reselect from 'reselect';

const { createSelector } = reselect;

const all = state => state.todos.all;
const filter = state => state.todos.filter;

export const getTodos = createSelector(
  all,
  filter,
  (all, filter) => {
    return _.omitBy(all, todo => {
      return filter === undefined ? false : filter !== todo.completed;
    });
  }
);

export const getAllTodosCount = createSelector(all, (all) => Object.values(all).length);
export const getFilter = createSelector(filter, filter => filter);
export const getTodosCount = createSelector(getTodos, (todos) => Object.values(todos).length);
export const getCompletedCount = createSelector(all, (all) => Object.values(all).filter(t => t.completed).length);
