import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';
import { isSortTypeAllowed } from '../utils/sort-utils.js';

const createSortTemplate = () => {
  let result = '';
  let lowerCaseSortName = '';

  Object.values(SortType).forEach((sort) => {
    lowerCaseSortName = sort.toLowerCase();

    result += `<div class="trip-sort__item  trip-sort__item--${lowerCaseSortName}">
      <input id="sort-${lowerCaseSortName}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${lowerCaseSortName}"
      ${sort === SortType.DAY ? 'checked' : ''}
      ${isSortTypeAllowed(sort) ? '' : 'disabled'}>
      <label class="trip-sort__btn" for="sort-${lowerCaseSortName}">${sort}</label>
    </div>`;
  });

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${result}
          </form>`;
};

export default class SortView extends AbstractView {
  #onSortComponentClick = null;
  #currentSort = null;

  constructor(currentSort, onSortClick) {
    super();

    this.#onSortComponentClick = onSortClick;
    this.#currentSort = currentSort;

    this.element.querySelectorAll('.trip-sort__btn').forEach((sortButtonElement) => {
      if (isSortTypeAllowed(sortButtonElement.textContent)) {
        sortButtonElement.addEventListener('click', this.#onSortTypeChange);
      }
    });
  }

  #onSortTypeChange = (evt) => {
    if (this.#currentSort === evt.target.textContent) {
      return;
    }
    this.#onSortComponentClick(evt.target.textContent);
  };

  get template() {
    return createSortTemplate();
  }
}
