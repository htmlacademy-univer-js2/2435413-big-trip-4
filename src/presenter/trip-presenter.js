import EventListView from '../view/event-list-view.js';
import TripInfoView from '../view/trip-info-view.js';
import EmptyListView from '../view/empty-list-view.js';
import NewPointButtonView from '../view/new-point-button-view.js';
import PointPresenter from './point-presenter.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import { sort } from '../utils/sort-utils.js';
import { filter } from '../utils/filter-utils.js';
import { POINT_EMPTY, SortType, UpdateType, UserAction, Mode } from '../const.js';
import FilterPresenter from './filter-presenter.js';
import SortPresenter from './sort-presenter.js';

const bodyElement = document.body;
const headerElement = bodyElement.querySelector('.page-header');
const tripInfoElement = headerElement.querySelector('.trip-main');
const filterContainer = tripInfoElement.querySelector('.trip-controls__filters');

export default class TripPresenter {
  #eventListComponent = new EventListView();
  #tripInfoComponent = null;
  #messageComponent = null;
  #newPointButtonComponent = null;
  #filterPresenter = null;
  #sortPresenter = null;

  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;
  #sortModel = null;

  #currentSortType = SortType.DAY;
  #pointPresenters = new Map();

  constructor(container, destinationsModel, offersModel, pointsModel, filterModel, sortModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;
    this.#sortModel = sortModel;

    this.#pointsModel.addObserver(this.#modelEventHandler);
    this.#sortModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
  }

  get points() {
    const filteredPoints = filter[this.#filterModel.get()](this.#pointsModel.get());
    return sort[this.#currentSortType](filteredPoints);
  }

  #renderTripInfo() {
    this.#tripInfoComponent = new TripInfoView(
      this.points.map((point) => (
        this.#destinationsModel.getById(point.destination))),
      this.points);

    render(this.#tripInfoComponent, tripInfoElement, RenderPosition.AFTERBEGIN);
  }

  #renderSort() {
    this.#sortPresenter = new SortPresenter(
      this.#sortModel.get(),
      this.#onSortComponentClick,
      this.#container,
    );

    this.#sortPresenter.init();
  }

  #renderFilters = () => {
    this.#filterPresenter = new FilterPresenter(
      filterContainer,
      this.#filterModel,
      this.#filterChangeHandler
    );

    this.#filterPresenter.init();
  };

  #renderEventList = () => render(this.#eventListComponent, this.#container);

  #renderEmptyList = () => {
    this.#messageComponent = new EmptyListView(this.#filterModel.get());
    render(this.#messageComponent, this.#eventListComponent.element);
  };

  #renderPoints() {
    this.points.forEach((point) => {
      const pointPresenter = new PointPresenter(
        this.#destinationsModel,
        this.#offersModel,
        this.#eventListComponent,
        this.#viewActionHandler,
        this.#modeChangeHandler
      );

      pointPresenter.init(point);

      this.#pointPresenters.set(point.id, pointPresenter);
    });
  }

  #renderNewPointButton = () => {
    this.#newPointButtonComponent = new NewPointButtonView(this.#newPointButtonClickHandler);
    render(this.#newPointButtonComponent, tripInfoElement);
  };

  #renderNewPoint = () => {
    const pointPresenter = new PointPresenter(
      this.#destinationsModel,
      this.#offersModel,
      this.#eventListComponent,
      this.#viewActionHandler,
      this.#modeChangeHandler
    );

    const point = {...POINT_EMPTY, id: crypto.randomUUID()};
    pointPresenter._mode = Mode.EMPTY_POINT;
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #renderBoard() {
    this.#renderFilters();
    this.#renderNewPointButton();

    if (this.points.length) {
      this.#renderTripInfo();
      this.#renderSort();
      this.#renderEventList();
      this.#renderPoints();

      return;
    }

    this.#renderEventList();
    this.#renderEmptyList();
  }

  #clearPoints() {
    this.#pointPresenters.forEach((pp) => {
      pp.destroy();
    });

    this.#pointPresenters = new Map();
  }

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#clearPoints();
    remove(this.#tripInfoComponent);
    remove(this.#messageComponent);
    remove(this.#newPointButtonComponent);
    this.#filterPresenter.remove();

    if (this.#sortPresenter) {
      this.#sortPresenter.remove();
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #onSortComponentClick = (sortType) => {
    this.#currentSortType = sortType;
    this.#sortModel.set(UpdateType.MINOR, sortType);
  };

  #filterChangeHandler = (filterType) => this.#filterModel.set(UpdateType.MAJOR, filterType);

  #modeChangeHandler = () => {
    this.#pointPresenters.forEach((point) => point.resetView());
  };

  #newPointButtonClickHandler = () => this.#renderNewPoint();

  #viewActionHandler = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.update(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.delete(updateType, update);
        break;
      case UserAction.CREATE_POINT:
        this.#pointsModel.add(updateType, update);
        break;
    }
  };

  #modelEventHandler = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  init = () => {
    this.#renderBoard();
  };
}
