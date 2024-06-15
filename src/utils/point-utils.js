import { POINT_EMPTY } from '../const.js';
import { getDuration } from './time-utils.js';

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

const isPointEmpty = (point) => {
  const currentPoint = Object.values(point);
  const emptyPoint = Object.values({...POINT_EMPTY});

  for (let i = 0; i < point.length - 1; i++) {
    if (currentPoint[i] !== emptyPoint[i] && emptyPoint[i] !== '') {
      return false;
    }
  }

  return true;
};

const adaptToClient = (point) => {
  const adaptedPoint = {
    ...point,
    basePrice: point['base_price'],
    dateFrom: point['date_from'],
    dateTo: point['date_to'],
    isFavorite: point['is_favorite']
  };

  delete adaptedPoint['base_price'];
  delete adaptedPoint['date_from'];
  delete adaptedPoint['date_to'];
  delete adaptedPoint['is_favorite'];

  return adaptedPoint;
};

const adaptToServer = (point, isNewPoint) => {
  const adaptedPoint = {
    ...point,
    ['base_price']: point.basePrice,
    ['date_from']: new Date(point.dateFrom).toISOString(),
    ['date_to']: new Date(point.dateTo).toISOString(),
    ['is_favorite']: point.isFavorite
  };

  if (isNewPoint) {
    delete adaptedPoint['id'];
  }

  delete adaptedPoint.basePrice;
  delete adaptedPoint.dateFrom;
  delete adaptedPoint.dateTo;
  delete adaptedPoint.isFavorite;

  return adaptedPoint;
};

const isBigDifference = (pointA, pointB) =>
  pointA.dateFrom !== pointB.dateFrom
  || pointA.basePrice !== pointB.basePrice
  || getDuration(pointA.dateFrom, pointA.dateTo) !== getDuration(pointB.dateFrom, pointB.dateTo);

const isEmptyEventDetails = (offers, dest) => offers.length || dest.description || dest.pictures.length;

export {
  updateItem,
  isPointEmpty,
  adaptToClient,
  adaptToServer,
  isBigDifference,
  isEmptyEventDetails
};
