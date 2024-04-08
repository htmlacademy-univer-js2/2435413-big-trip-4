import AbstractView from '../framework/view/abstract-view.js';
import { FILTERS } from '../const.js';

const createFilterTemplate = (activeFilter) => {
  let result = '';
  let filterL = '';
  let check = '';

  FILTERS.forEach((filter) => {
    check = activeFilter === filter ? 'checked' : 'disabled';
    filterL = filter.toLowerCase();

    result += `<div class="trip-filters__filter">
    <input id="filter-${filterL}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterL}" ${check}>
    <label class="trip-filters__filter-label" for="filter-${filterL}">${filter}</label>
  </div>`;
  });

  return `<form class="trip-filters" action="#" method="get">
            ${result}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
};

export default class FilterView extends AbstractView{
  #filter = false;

  constructor(filter) {
    super();

    this.#filter = filter;
  }

  get template() {
    return createFilterTemplate(this.#filter);
  }
}
