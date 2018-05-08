import { get } from '@ember/object';
import { combineReducers } from 'redux';
import Evented from '@ember/object/evented';
import Service, { inject as service } from '@ember/service';

const getReducerModule = function(modulePath) {
  const fileNamePattern = new RegExp('(.*)/app/reducers/(.*)');
  const match = fileNamePattern.exec(modulePath);
  if (match && match.length === 3) {
    const reducer = match[2].replace('.js', '');
    return 'todomvc/reducers/' + reducer;
  }
};

export default Service.extend(Evented, {
  redux: service(),
  init () {
    this._super(...arguments);
    this.on('willLiveReload', this, 'confirmLiveReload');
    this.on('willHotReload', this, 'attemptLiveReload');
  },
  confirmLiveReload(event) {
    const module = getReducerModule(event.modulePath);
    if (module) {
      event.cancel = true;
      window.requirejs.unsee(module);
    }
  },
  attemptLiveReload(modulePath) {
    const redux = get(this, 'redux');
    const module = getReducerModule(modulePath);
    if (module) {
      const hotReloadedReducer = window.require(module);
      redux.replaceReducer(combineReducers({
        todos: hotReloadedReducer['default']
      }));
    }
  }
});
