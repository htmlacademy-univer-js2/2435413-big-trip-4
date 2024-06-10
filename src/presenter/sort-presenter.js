import SortView from '../view/sort-view.js';
import { render, remove } from '../framework/render.js';
import { UpdateType } from '../const.js';

export default class SortPresenter {
  #container = null;
  #sortComponent = null;
  #currentSort = null;
  #sortModel = null;
  #sortChangeHandler = null;

  constructor(sortChangeHandler, container, sortModel) {
    this.#currentSort = sortModel.get();
    this.#sortChangeHandler = sortChangeHandler;
    this.#container = container;
    this.#sortModel = sortModel;
  }

  init() {
    this.#renderSort();
  }

  remove() {
    remove(this.#sortComponent);
  }

  #renderSort() {
    this.#sortComponent = new SortView(
      this.#currentSort,
      this.#onSortComponentClick
    );

    render(this.#sortComponent, this.#container);
  }

  #onSortComponentClick = (sortType) => {
    this.#sortChangeHandler(sortType);
    this.#sortModel.set(UpdateType.MINOR, sortType);
  };
}
