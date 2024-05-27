import { getDuration } from './time-utils.js';
import { POINT_EMPTY } from '../const.js';

export const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

export const getRandomIntegerFromRange = (start, end) => Math.ceil(Math.random() * (end - start + 1)) + start - 1;

export const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

export const isBigDifference = (pointA, pointB) =>
  pointA.dateFrom !== pointB.dateFrom
  || pointA.basePrice !== pointB.basePrice
  || getDuration(pointA.dateFrom, pointA.dateTo) !== getDuration(pointB.dateFrom, pointB.dateTo);

export const isEscapeKey = (key) => key === 'Escape';

export const upperFirst = (str) => str[0].toUpperCase() + str.slice(1);

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
