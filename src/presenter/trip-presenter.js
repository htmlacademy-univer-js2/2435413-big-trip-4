import EventListView from '../view/event-list-view.js';
import FilterView from '../view/filter-view.js';
import TripInfoView from '../view/trip-info-view.js';
import EmptyListView from '../view/empty-list-view.js';
import PointPresenter from './point-presenter.js';
import SortPresenter from './sort-presenter.js';
import { render, RenderPosition } from '../framework/render.js';
import { getRandomArrayElement, updateItem } from '../utils/utils.js';
import { sort } from '../utils/sort-utils.js';
import { FILTERS, SortType } from '../const.js';

const bodyElement = document.body;
const headerElement = bodyElement.querySelector('.page-header');
const tripInfoElement = headerElement.querySelector('.trip-main');
const filterElement = tripInfoElement.querySelector('.trip-controls__filters');

export default class TripPresenter {
  #eventListComponent = new EventListView();

  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #points = null;

  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor(container, destinationsModel, offersModel, pointsModel) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#points = sort[SortType.DAY]([...pointsModel.get()]);
  }

  #renderPoints() {
    this.#points.forEach((point) => {
      const pointPresenter = new PointPresenter(
        this.#destinationsModel,
        this.#offersModel,
        this.#eventListComponent,
        this.#pointChangeHandler,
        this.#modeChangeHandler);

      pointPresenter.init(point);

      this.#pointPresenters.set(point.id, pointPresenter);
    });
  }

  #renderTripInfo() {
    render(new TripInfoView(
      this.#points.map((point) => (
        this.#destinationsModel.getById(point.destination))),
      this.#points), tripInfoElement, RenderPosition.AFTERBEGIN);
  }

  #destroyPointPresenters() {
    this.#pointPresenters.forEach((pp) => {
      pp.destroy();
    });

    this.#pointPresenters = new Map();
  }

  #onSortComponentClick = (evt) => {
    if (this.#currentSortType !== evt.target.textContent) {
      this.#currentSortType = evt.target.textContent;

      sort[this.#currentSortType](this.#points);

      this.#destroyPointPresenters();
      this.#renderPoints();
    }
  };

  #renderSort() {
    const sortPresenter = new SortPresenter(
      this.#onSortComponentClick,
      this.#container
    );

    sortPresenter.init();
  }

  #renderBoard() {
    const filter = getRandomArrayElement(FILTERS);

    render(new FilterView(filter), filterElement);

    if (this.#points.length) {
      this.#renderTripInfo();
      this.#renderSort();

      render(this.#eventListComponent, this.#container);

      this.#renderPoints();

      return;
    }

    render(this.#eventListComponent, this.#container);
    render(new EmptyListView(filter), this.#eventListComponent.element);
  }

  #pointChangeHandler = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #modeChangeHandler = () => {
    this.#pointPresenters.forEach((point) => point.resetView());
  };

  init() {
    this.#renderBoard();
  }
}
