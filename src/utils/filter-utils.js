import dayjs from 'dayjs';
import {FilterType} from '../const';

const filterByFuture = (event) => dayjs().isBefore(event.dateFrom);

const filterByPresent = (event) => dayjs().isAfter(event.dateFrom) && dayjs().isBefore(event.dateTo);

const filterByPast = (event) => dayjs().isAfter(event.dateTo);

export const filter = {
  [FilterType.EVERYTHING]: (events) => [...events],
  [FilterType.FUTURE]: (events) => events.filter((event) => filterByFuture(event)),
  [FilterType.PRESENT]: (events) => events.filter((event) => filterByPresent(event)),
  [FilterType.PAST]: (events) => events.filter((event) => filterByPast(event)),
};
