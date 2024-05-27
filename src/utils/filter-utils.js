import dayjs from 'dayjs';
import {FilterType} from '../const';

const filterByPast = (date, param) => dayjs().isAfter(dayjs(date), param);

const filterByFuture = (date, param) => dayjs().isBefore(dayjs(date), param) || dayjs().isSame(dayjs(date), param);

const filterByPresent = (point) => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const startDate = new Date(point.startDate);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(point.endDate);
  endDate.setHours(0, 0, 0, 0);
  return startDate <= currentDate && endDate >= currentDate;
};

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => filterByFuture(point.startDate, 'D') || filterByFuture(point.endDate, 'D')),
  [FilterType.PRESENT]: (points) => points.filter((point) => filterByPresent(point)),
  [FilterType.PAST]: (points) => points.filter((point) => filterByPast(point.endDate, 'D') || filterByPast(point.startDate, 'D'))
};
