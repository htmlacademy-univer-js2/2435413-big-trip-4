import TripPresenter from './presenter/trip-presenter.js';
import MockService from './service/mock-service.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import SortModel from './model/sort-model.js';

const bodyElement = document.querySelector('body');
const mainElement = bodyElement.querySelector('.page-main');
const eventListElement = mainElement.querySelector('.trip-events');

const mockService = new MockService();
const destinationsModel = new DestinationsModel(mockService);
const offersModel = new OffersModel(mockService);
const pointModel = new PointModel(mockService);
const filterModel = new FilterModel();
const sortModel = new SortModel();

const tripPresenter = new TripPresenter(
  eventListElement,
  destinationsModel,
  offersModel,
  pointModel,
  filterModel,
  sortModel
);

tripPresenter.init();
