import { DateFormat, MILLISECONDS_IN_HOUR, MILLISECONDS_IN_DAY } from '../const.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const humanizeTaskDueDate = (dueDate) => dueDate ? dayjs(dueDate).format(DateFormat.LONG) : '';

const formatToDateTime = (dueDate) => dueDate ? dayjs(dueDate).format(DateFormat.LONG) : '';

const formatToShortDate = (time) => time ? dayjs(time).format(DateFormat.SHORT) : '';

const formatToShortTime = (time) => time ? dayjs(time).format('HH:mm') : '';

const getDuration = (dateFrom, dateTo) => {
  const timeDifference = dayjs(dateTo).diff(dayjs(dateFrom));

  if (timeDifference >= MILLISECONDS_IN_DAY) {
    return dayjs.duration(timeDifference).format('DD[D] HH[H] mm[M]');
  } else if (timeDifference >= MILLISECONDS_IN_HOUR) {
    return dayjs.duration(timeDifference).format('HH[H] mm[M]');
  } else if (timeDifference < MILLISECONDS_IN_HOUR) {
    return dayjs.duration(timeDifference).format('mm[M]');
  }
};

export {
  humanizeTaskDueDate,
  formatToDateTime,
  formatToShortDate,
  formatToShortTime,
  getDuration
};
