import SortView from '../view/sort-view.js';
import { render, remove } from '../framework/render.js';

export default class SortPresenter {
  #onSortComponentClick = null;
  #container = null;
  #sortComponent = null;
  #currentSort = null;

  constructor(currentSort, onSortComponentClick, container) {
    this.#currentSort = currentSort;
    this.#onSortComponentClick = onSortComponentClick;
    this.#container = container;
  }

  #renderSort() {
    this.#sortComponent = new SortView(
      this.#currentSort,
      this.#onSortComponentClick);

    render(this.#sortComponent, this.#container);
  }

  init() {
    this.#renderSort();
  }

  remove() {
    remove(this.#sortComponent);
  }
}
