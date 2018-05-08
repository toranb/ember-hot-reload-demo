import Component from '@ember/component';
import { get, computed } from '@ember/object';

export default Component.extend({
  tagName: 'span',
  classNames: 'todo-count',
  itemWord: computed('todosCount', function() {
    let count = get(this, 'todosCount');
    return count > 1 ? 'items' : 'item';
  })
});
