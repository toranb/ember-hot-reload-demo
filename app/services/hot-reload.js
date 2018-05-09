import { get } from '@ember/object';
import { combineReducers } from 'redux';
import Evented from '@ember/object/evented';
import Service, { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';

const getReducerModule = function(modulePath, modulePrefix) {
  const fileNamePattern = new RegExp('(.*)/app/reducers/(.*)');
  const match = fileNamePattern.exec(modulePath);
  if (match && match.length === 3) {
    const reducer = match[2].replace('.js', '');
    return `${modulePrefix}/reducers/${reducer}`;
  }
};

export default Service.extend(Evented, {
  redux: service(),
  init () {
    this._super(...arguments);
    this.on('willLiveReload', this, 'confirmLiveReload');
    this.on('willHotReload', this, 'attemptLiveReload');
    const factory = getOwner(this).factoryFor('config:environment');
    this.modulePrefix = factory.class.modulePrefix;
  },
  confirmLiveReload(event) {
    const module = getReducerModule(event.modulePath, this.modulePrefix);
    if (module) {
      event.cancel = true;
      window.requirejs.unsee(module);
    }
  },
  attemptLiveReload(modulePath) {
    const module = getReducerModule(modulePath, this.modulePrefix);
    if (module) {
      const redux = get(this, 'redux');
      const hotReloadedReducer = window.require(module);
      redux.replaceReducer(combineReducers({
        todos: hotReloadedReducer['default']
      }));
    }
  }
});
