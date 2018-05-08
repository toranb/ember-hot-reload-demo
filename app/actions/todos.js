import * as types from './types';

export const addTodo = text => dispatch => dispatch({type: types.ADD_TODO, text});
export const deleteTodo = id => dispatch => dispatch({type: types.DELETE_TODO, id});
export const editTodo = (id, text) => dispatch => dispatch({type: types.EDIT_TODO, id, text});
export const completeTodo = id => dispatch => dispatch({type: types.COMPLETE_TODO, id});
export const clearCompleted = () => dispatch => dispatch({type: types.CLEAR_COMPLETED});
export const showAll = () => dispatch => dispatch({type: types.SHOW_ALL});
export const showActive = () => dispatch => dispatch({type: types.SHOW_ACTIVE});
export const showCompleted = () => dispatch => dispatch({type: types.SHOW_COMPLETED});
