import TripPresenter from './presenter/trip-presenter.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import SortModel from './model/sort-model.js';
import PointsApiService from './service/point-api-service.js';

const AUTHORIZATION = 'Basic hs0NCvhAEP3';
const END_POINT = 'https://21.objects.htmlacademy.pro/big-trip';

const bodyElement = document.querySelector('body');
const mainElement = bodyElement.querySelector('.page-main');
const eventListElement = mainElement.querySelector('.trip-events');

const pointApiService = new PointsApiService(END_POINT, AUTHORIZATION);
const destinationsModel = new DestinationsModel(pointApiService);
const offersModel = new OffersModel(pointApiService);
const filterModel = new FilterModel();
const sortModel = new SortModel();

const pointsModel = new PointsModel(
  pointApiService,
  destinationsModel,
  offersModel
);

const tripPresenter = new TripPresenter(
  eventListElement,
  destinationsModel,
  offersModel,
  pointsModel,
  filterModel,
  sortModel
);

tripPresenter.init();
pointsModel.init();
