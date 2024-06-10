import AbstractView from '../framework/view/abstract-view.js';
import { Filters } from '../const.js';

const createEmptyListTemplate = (filter) => `
<section class="trip-events">
  <h2 class="visually-hidden">Trip events</h2>
  <p class="trip-events__msg">${Filters[filter]}</p>
</section>
`;

export default class EmptyListView extends AbstractView {
  #filter = null;

  constructor(filter) {
    super();

    this.#filter = filter;
  }

  get template() {
    return createEmptyListTemplate(this.#filter);
  }
}
