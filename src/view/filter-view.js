import AbstractView from '../framework/view/abstract-view.js';
import { FILTERS } from '../const.js';

const createFilterTemplate = (activeFilter) => {
  let result = '';

  FILTERS.forEach((filter) => {
    const check = activeFilter === filter ? 'checked' : 'disabled';
    const lowerCasefilterName = filter.toLowerCase();

    result += `<div class="trip-filters__filter">
    <input id="filter-${lowerCasefilterName}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${lowerCasefilterName}" ${check}>
    <label class="trip-filters__filter-label" for="filter-${lowerCasefilterName}">${filter}</label>
  </div>`;
  });

  return `<form class="trip-filters" action="#" method="get">
            ${result}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
};

export default class FilterView extends AbstractView{
  #filter = null;

  constructor(filter) {
    super();

    this.#filter = filter;
  }

  get template() {
    return createFilterTemplate(this.#filter);
  }
}
