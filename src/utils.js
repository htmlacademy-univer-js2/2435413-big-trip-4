import { Duration, DateFormat, MILLISECONDS_IN_HOUR, MILLISECONDS_IN_DAY} from './const.js';
import dayjs from 'dayjs';

const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

export const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

export const humanizeTaskDueDate = (dueDate) => dueDate ? dayjs(dueDate).format(DateFormat.LONG) : '';

export const getRandomIntegerFromRange = (start, end) => Math.ceil(Math.random() * (end - start + 1)) + start - 1;

export const formatToDateTime = (dueDate) => dueDate ? dayjs(dueDate).format(DateFormat.LONG) : '';

export const formatToShortDate = (time) => time ? dayjs(time).format(DateFormat.SHORT) : '';

export const formatToShortTime = (time) => time ? dayjs(time).format('HH:mm') : '';

export const getDate = (add) => {
  let date = dayjs().subtract(getRandomIntegerFromRange(0, Duration.DAY), 'day').toDate();

  const mins = getRandomIntegerFromRange(0, Duration.MIN);
  const hours = getRandomIntegerFromRange(0, Duration.HOUR);
  const days = getRandomIntegerFromRange(0, Duration.DAY);

  if (add) {
    date = dayjs(date)
      .add(mins, 'minute')
      .add(hours, 'hour')
      .add(days, 'days')
      .toDate();
  }

  return date;
};

export const getDuration = (dateFrom, dateTo) => {
  const timeDifference = dayjs(dateTo).diff(dayjs(dateFrom));

  if (timeDifference >= MILLISECONDS_IN_DAY) {
    return dayjs.duration(timeDifference).format('DD[D] HH[H] mm[M]');
  } else if (timeDifference >= MILLISECONDS_IN_HOUR) {
    return dayjs.duration(timeDifference).format('HH[H] mm[M]');
  } else if (timeDifference < MILLISECONDS_IN_HOUR) {
    return dayjs.duration(timeDifference).format('mm[M]');
  }
};

export const updateItem = (items, update) => {
  return items.map((item) => item.id === update.id ? update : item);
}

export const removeHandlerOnEscape = (cb) => document.removeEventListener('keydown', cb);

export const onEscapeKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    removeHandlerOnEscape(onEscapeKeyDown);
  }
}
