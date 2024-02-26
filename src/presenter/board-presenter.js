import EventListView from '../view/event-list-view.js';
import FilterView from '../view/filter-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import TripInfoView from '../view/trip-info-view.js';

import { render, RenderPosition } from '../render.js';

const POINT_COUNT = 3;

const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.page-header');
const tripInfoElement = headerElement.querySelector('.trip-main');
const filterElement = tripInfoElement.querySelector('.trip-controls__filters');

export default class BoardPresenter {
  sortComponent = new SortView();
  eventListComponent = new EventListView();

  constructor({container}) {
    this.container = container;
  }

  init() {
    render(new TripInfoView(), tripInfoElement, RenderPosition.AFTERBEGIN);
    render(new FilterView(), filterElement);

    render(this.sortComponent, this.container);
    render(this.eventListComponent, this.container);

    render(new PointEditView(), this.eventListComponent.getElement());

    for (let i = 0; i < POINT_COUNT; i++) {
      render(new PointView(), this.eventListComponent.getElement());
    }
  }
}
