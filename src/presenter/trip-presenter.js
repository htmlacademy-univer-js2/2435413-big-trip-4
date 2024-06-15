import EventListView from '../view/event-list-view.js';
import LoadingView from '../view/loading-view.js';
import TripInfoView from '../view/trip-info-view.js';
import EmptyListView from '../view/empty-list-view.js';
import NewPointButtonView from '../view/new-point-button-view.js';
import ErrorView from '../view/error-view.js';
import PointPresenter from './point-presenter.js';
import FilterPresenter from './filter-presenter.js';
import SortPresenter from './sort-presenter.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import NewPointPresenter from './new-point-presenter.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import { sort } from '../utils/sort-utils.js';
import { filter } from '../utils/filter-utils.js';
import { POINT_EMPTY, SortType, UpdateType, UserAction, TimeLimit, FilterType } from '../const.js';

const bodyElement = document.body;
const headerElement = bodyElement.querySelector('.page-header');
const tripInfoElement = headerElement.querySelector('.trip-main');
const filterContainer = tripInfoElement.querySelector('.trip-controls__filters');

export default class TripPresenter {
  #eventListComponent = new EventListView();
  #errorComponent = new ErrorView();
  #loadingComponent = new LoadingView();
  #tripInfoComponent = null;
  #messageComponent = null;
  #newPointButtonComponent = null;

  #filterPresenter = null;
  #sortPresenter = null;
  #newPointPresenter = null;
  #pointPresenters = new Map();

  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;
  #sortModel = null;

  #currentSortType = SortType.DAY;
  #isError = false;
  #isLoading = true;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

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

  init() {
  }

  #renderBoard() {
    this.#renderFilters();

    if (!this.#newPointButtonComponent) {
      this.#renderNewPointButton();
    }

    if (this.#isError) {
      this.#renderError();

      return;
    }

    if (this.#isLoading) {
      this.#newPointButtonComponent.setDisabled(true);
      this.#renderLoading();

      return;
    }

    if (this.points.length && !this.#isLoading) {
      this.#renderTripInfo();
      this.#renderSort();
      this.#renderEventList();
      this.#renderPoints();

      return;
    }

    this.#renderEventList();
    this.#renderEmptyList();
  }

  #renderPoints() {
    this.points.forEach((point) => {
      const pointPresenter = new PointPresenter(
        this.#destinationsModel,
        this.#offersModel,
        this.#eventListComponent,
        this.#viewActionHandler,
        this.#modeChangeHandler,
        this.#newPointButtonComponent
      );

      pointPresenter.init(point);

      this.#pointPresenters.set(point.id, pointPresenter);
    });
  }

  #renderNewPoint = () => {
    this.#modeChangeHandler();

    this.#newPointPresenter = new NewPointPresenter(
      this.#destinationsModel,
      this.#offersModel,
      this.#eventListComponent,
      this.#viewActionHandler,
      this.#newPointButtonComponent
    );

    this.#filterModel.set(UpdateType.MAJOR, FilterType.EVERYTHING);
    const point = POINT_EMPTY;
    this.#newPointPresenter.init(point);
  };

  #renderTripInfo() {
    this.#tripInfoComponent = new TripInfoView(
      this.points.map((point) => (
        this.#destinationsModel.getById(point.destination)
      )),
      this.points,
      [...this.#offersModel.get()]);

    render(this.#tripInfoComponent, tripInfoElement, RenderPosition.AFTERBEGIN);
  }

  #renderSort() {
    this.#sortPresenter = new SortPresenter(
      this.#sortChangeHandler,
      this.#container,
      this.#sortModel
    );

    this.#sortPresenter.init();
  }

  #renderFilters = () => {
    this.#filterPresenter = new FilterPresenter(
      filterContainer,
      this.#filterModel
    );

    this.#filterPresenter.init();
  };

  #renderError = () => render(this.#errorComponent, this.#container, RenderPosition.AFTERBEGIN);

  #renderLoading = () => render(this.#loadingComponent, this.#container, RenderPosition.AFTERBEGIN);

  #renderEventList = () => render(this.#eventListComponent, this.#container);

  #renderEmptyList = () => {
    this.#messageComponent = new EmptyListView(this.#filterModel.get());
    render(this.#messageComponent, this.#eventListComponent.element);
  };

  #renderNewPointButton = () => {
    this.#newPointButtonComponent = new NewPointButtonView(this.#newPointButtonClickHandler);
    render(this.#newPointButtonComponent, tripInfoElement);
  };

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#clearPoints();

    remove(this.#tripInfoComponent);
    remove(this.#messageComponent);
    this.#filterPresenter.remove();

    if (this.#sortPresenter) {
      this.#sortPresenter.remove();
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
      this.#sortModel.set('', SortType.DAY);
    }
  };

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => {
      presenter.destroy();
    });
    this.#pointPresenters = new Map();
    this.#newPointPresenter.destroy();
  }

  #viewActionHandler = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.update(updateType, update);
        } catch {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.delete(updateType, update);
        } catch {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.CREATE_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.add(updateType, update);
        } catch {
          this.#newPointPresenter.setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
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
      case UpdateType.INIT:
        if (data.isError) {
          this.#isLoading = false;
          this.#isError = true;
        } else {
          this.#isLoading = false;
          this.#isError = false;
          remove(this.#loadingComponent);
        }
        this.#renderBoard();
        break;
    }
  };

  #sortChangeHandler = (sortType) => {
    this.#currentSortType = sortType;
  };

  #modeChangeHandler = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #newPointButtonClickHandler = () => this.#renderNewPoint();
}
