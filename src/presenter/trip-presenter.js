import EventListView from '../view/event-list-view.js';
import FilterView from '../view/filter-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import TripInfoView from '../view/trip-info-view.js';
import EmptyListView from '../view/empty-list.js';

import { render, RenderPosition, replace } from '../framework/render.js';
import { getRandomArrayElement } from '../utils.js';
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

  constructor(container, destinationsModel, offersModel, pointsModel) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#points = [...pointsModel.get()];
  }

  #renderPoint = (point, destination, offers) => {
    const pointComponent = new PointView(
      point,
      destination,
      offers,
      onRollupButtonClick);

    const pointEditComponent = new PointEditView(point,
      destination,
      offers,
      onResetButtonClick,
      onSaveButtonSubmit);

    const removeHandlerOnEscape = () => document.removeEventListener('keydown', onEscapeKeyDown);

    function onSaveButtonSubmit(evt) {
      evt.preventDefault();
      replace(pointComponent, pointEditComponent);
      removeHandlerOnEscape();
    }

    function onEscapeKeyDown(evt) {
      if (evt.key === 'Escape') {
        replace(pointComponent, pointEditComponent);
        removeHandlerOnEscape();
      }
    }

    function onRollupButtonClick() {
      replace(pointEditComponent, pointComponent);
      document.addEventListener('keydown', onEscapeKeyDown);
    }

    function onResetButtonClick() {
      replace(pointComponent, pointEditComponent);
      removeHandlerOnEscape();
    }

    render(pointComponent, this.#eventListComponent.element);
  };

  init() {
    const filter = getRandomArrayElement(FILTERS);

    render(new FilterView(filter), filterElement);

    if (this.#points.length) {
      render(new TripInfoView(
        this.#points.map((point) => (
          this.#destinationsModel.getById(point.destination))),
        this.#points), tripInfoElement, RenderPosition.AFTERBEGIN);

      render(this.#sortComponent, this.#container);
      render(this.#eventListComponent, this.#container);

      for (let i = 0; i < this.#points.length; i++) {
        this.#renderPoint(
          this.#points[i],
          this.#destinationsModel.getById(this.#points[i].destination),
          this.#offersModel.getByType(this.#points[i].type));
      }
    }
    else {
      render(this.#eventListComponent, this.#container);
      render(new EmptyListView(filter), this.#eventListComponent.element);
    }
  }
}
