import { POINT_EMPTY } from '../const.js';
import { getDuration } from './time-utils.js';

export const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

export const isPointEmpty = (point) => {
  const p = Object.values(point);
  const p2 = Object.values({...POINT_EMPTY});

  for (let i = 0; i < p.length - 1; i++) {
    if (p[i] !== p2[i]) {
      return false;
    }
  }

  return true;
};

export const adaptToClient = (point) => {
  const adaptedPoint = {
    ...point,
    basePrice: ['base_price'],
    dateFrom: ['date_from'],
    dateTo: ['date_to'],
    isFavorite: ['is_favorite']
  };

  delete adaptedPoint['base_price'];
  delete adaptedPoint['date_from'];
  delete adaptedPoint['date_to'];
  delete adaptedPoint['is_favorite'];

  return adaptedPoint;
};

export const adaptToServer = (point) => {
  const adaptedPoint = {
    ...point,
    ['base_price']: point.basePrice,
    ['date_from']: new Date(point.dateFrom).toISOString(),
    ['date_to']: new Date(point.dateTo).toISOString(),
    ['is_favorite']: point.isFavorite
  };

  delete adaptedPoint.basePrice;
  delete adaptedPoint.dateFrom;
  delete adaptedPoint.dateTo;
  delete adaptedPoint.isFavorite;

  return adaptedPoint;
};

export const isBigDifference = (pointA, pointB) =>
  pointA.dateFrom !== pointB.dateFrom
  || pointA.basePrice !== pointB.basePrice
  || getDuration(pointA.dateFrom, pointA.dateTo) !== getDuration(pointB.dateFrom, pointB.dateTo);
