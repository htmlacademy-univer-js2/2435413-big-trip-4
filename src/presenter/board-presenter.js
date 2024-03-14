import EventListView from '../view/event-list-view.js';
import FilterView from '../view/filter-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import TripInfoView from '../view/trip-info-view.js';

import { COUNT_POINTS } from '../const.js';

import { render, RenderPosition } from '../render.js';

const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.page-header');
const tripInfoElement = headerElement.querySelector('.trip-main');
const filterElement = tripInfoElement.querySelector('.trip-controls__filters');

export default class BoardPresenter {
  sortComponent = new SortView();
  eventListComponent = new EventListView();

  constructor(container, destinationsModel, offersModel, pointsModel) {
    this.container = container;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.pointsModel = pointsModel;

    this.points = [...pointsModel.get()];
  }

  init() {
    render(new TripInfoView(
      this.destinationsModel,
      this.points), tripInfoElement, RenderPosition.AFTERBEGIN);

    render(new FilterView(), filterElement);

    render(this.sortComponent, this.container);
    render(this.eventListComponent, this.container);

    render(new PointEditView(
      this.points[COUNT_POINTS - 1],
      this.destinationsModel.getById(this.points[COUNT_POINTS - 1].destination),
      this.offersModel.getByType(this.points[COUNT_POINTS - 1].type)), this.eventListComponent.getElement());

    for (let i = 0; i < this.points.length - 1; i++) {
      render(new PointView(this.points[i],
        this.destinationsModel.getById(this.points[i].destination),
        this.offersModel.getByType(this.points[i].type)), this.eventListComponent.getElement());
    }
  }
}
