import { render, replace, remove } from '../framework/render.js';
import FilterView from '../view/filter-view.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #filterComponent = null;
  #filterChangeHandler = null;

  constructor(filterChangeContainer, filterModel, filterHandler) {
    this.#filterContainer = filterChangeContainer;
    this.#filterModel = filterModel;
    this.#filterChangeHandler = filterHandler;
  }

  #renderFilters = () => {
    const previousFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(
      this.#filterModel.get(),
      this.#filterChangeHandler
    );

    if (!previousFilterComponent) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, previousFilterComponent);
  };

  init() {
    this.#renderFilters();
  }

  remove() {
    remove(this.#filterComponent);
  }
}
