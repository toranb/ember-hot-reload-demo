import _ from 'lodash';
import reselect from 'reselect';
import * as types from '../actions/types';

const { createSelector } = reselect;

const initialState = {
  filter: undefined,
  all: {
    1: {
      id: 1,
      text: 'Use Ember Redux',
      completed: false
    }
  }
};

export default function todos(state, action) {
  switch (action.type) {
    case types.CLEAR_COMPLETED: {
      let todos = _.omitBy(state.all, todo => todo.completed === true);
      return {
        ...state,
        all: todos
      }
    }

    case types.SHOW_ACTIVE: {
      return {
        ...state,
        filter: false
      }
    }

    case types.SHOW_COMPLETED: {
      return {
        ...state,
        filter: true
      }
    }

    case types.SHOW_ALL: {
      return {
        ...state,
        filter: undefined
      }
    }

    case types.DELETE_TODO: {
      let todos = _.omit(state.all, [action.id]);
      return {
        ...state,
        all: todos
      }
    }

    case types.EDIT_TODO: {
      let todos = _.mapValues(state.all, todo => {
        return todo.id === action.id ? _.defaults({
          text: action.text
        }, todo) : todo;
      });
      return {
        ...state,
        all: {...state.all, ...todos}
      }
    }

    case types.COMPLETE_TODO: {
      let todos = _.mapValues(state.all, todo => {
        return todo.id === action.id ? _.defaults({
          completed: !todo.completed
        }, todo) : todo;
      });
      return {
        ...state,
        all: {...state.all, ...todos}
      }
    }

    case types.ADD_TODO: {
      const id = Object.values(state.all).reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;
      let todo = {
        [id]: {
          id: id,
          completed: false,
          text: action.text
        }
      }
      return {
        ...state,
        all: {...state.all, ...todo}
      }
    }

    default: {
      return state || initialState;
    }
  }
}

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
