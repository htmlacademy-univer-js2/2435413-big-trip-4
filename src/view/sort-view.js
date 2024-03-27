import AbstractView from '../framework/view/abstract-view.js';
import { SORTS } from '../const.js';

const createSortTemplate = () => {
  let result = '';
  let sortL = '';

  SORTS.forEach((sort) => {
    sortL = sort.toLowerCase();

    result += `<div class="trip-sort__item  trip-sort__item--${sortL}">
      <input id="sort-${sortL}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortL}">
      <label class="trip-sort__btn" for="sort-${sortL}">${sort}</label>
    </div>`;
  });

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${result}
          </form>`;
};

export default class SortView extends AbstractView {
  get template() {
    return createSortTemplate();
  }
}
