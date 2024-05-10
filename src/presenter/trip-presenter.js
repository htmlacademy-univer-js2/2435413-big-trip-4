import EventListView from '../view/event-list-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import TripInfoView from '../view/trip-info-view.js';
import EmptyListView from '../view/empty-list.js';

import PointPresenter from './point-presenter.js';

import { render, RenderPosition } from '../framework/render.js';
import { getRandomArrayElement, updateItem } from '../utils.js';
import { FILTERS } from '../const.js';

const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.page-header');
const tripInfoElement = headerElement.querySelector('.trip-main');
const filterElement = tripInfoElement.querySelector('.trip-controls__filters');

export default class TripPresenter {
  #sortComponent = new SortView();
  #eventListComponent = new EventListView();

  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #points = null;

  #pointPresenters = new Map();

  constructor(container, destinationsModel, offersModel, pointsModel) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#points = [...pointsModel.get()];
  }

  #renderPoint() {
    for (let i = 0; i < this.#points.length; i++) {
      const point = this.#points[i];

      const pointPresenter = new PointPresenter(this.#destinationsModel,
        this.#offersModel,
        this.#eventListComponent,
        this.#pointChangeHandler,
        this.#modeChangeHandler);

      pointPresenter.init(point);

      this.#pointPresenters.set(point.id, pointPresenter);
    }
  }

  #renderTripInfo() {
    render(new TripInfoView(
      this.#points.map((point) => (
        this.#destinationsModel.getById(point.destination))),
      this.#points), tripInfoElement, RenderPosition.AFTERBEGIN);
  }

  #renderBoard() {
    const filter = getRandomArrayElement(FILTERS);

    render(new FilterView(filter), filterElement);

    if (this.#points.length) {
      this.#renderTripInfo();

      render(this.#sortComponent, this.#container);
      render(this.#eventListComponent, this.#container);

      this.#renderPoint();

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
    this.#pointPresenters.forEach((p) => p.resetView());
  };

  init() {
    this.#renderBoard();
  }
}
