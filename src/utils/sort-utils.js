import { SortType} from '../const.js';
import dayjs from 'dayjs';

const getTimeDifference = (point) => dayjs(point.dateTo).diff(dayjs(point.dateFrom));

const sortByDay = (pointA, pointB) => dayjs(pointB.dateTo).diff(dayjs(pointA.dateTo));

const sortByTime = (pointA, pointB) => getTimeDifference(pointB) - getTimeDifference(pointA);

const sortByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export const sort = {
  [SortType.DAY]: (array) => array.sort(sortByDay),
  [SortType.TIME]: (array) => array.sort(sortByTime),
  [SortType.PRICE]: (array) => array.sort(sortByPrice)
};

export const isSortTypeAllowed = (type) => !(type === SortType.EVENT || type === SortType.OFFERS);
