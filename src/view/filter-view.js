import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';
import { upperFirst } from '../utils/utils.js';

const createFiltersElements = (currentFilterType) => {
  let result = '';

  Object.values(FilterType).forEach((filter) => {
    const checked = filter === currentFilterType ? 'checked' : '';
    const lowerCaseFilterName = filter.toLowerCase();

    result += `<div class="trip-filters__filter">
        <input id="filter-${lowerCaseFilterName}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
        value="${lowerCaseFilterName}" ${checked}>
        <label class="trip-filters__filter-label" for="filter-${lowerCaseFilterName}">${filter}</label>
        </div>`;
  });

  return result;
};

const createFiltersTemplate = (currentFilterType) => `
<form class="trip-filters" action="#" method="get">
  ${createFiltersElements(currentFilterType)}
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;

export default class FiltersView extends AbstractView{
  #currentFilter = null;
  #filterTypeHandler = null;

  constructor(currentFilterType, filterTypeHandler) {
    super();

    this.#currentFilter = currentFilterType;
    this.#filterTypeHandler = filterTypeHandler;
    this.element.addEventListener('change', this.#onFilterTypeChange);
  }

  get template(){
    return createFiltersTemplate(this.#currentFilter);
  }

  #onFilterTypeChange = (evt) => {
    if (this.#currentFilter === upperFirst(evt.target.value)) {
      return;
    }
    this.#filterTypeHandler(upperFirst(evt.target.value));
  };
}
