import { getRandomIntegerFromRange, humanizeTaskDueDate, getDate} from '../utils.js';
import { Price } from '../const.js';

export const generateMockPoints = (type, destinationId, offersIds) => (
  {
    id: crypto.randomUUID(),
    basePrice: getRandomIntegerFromRange(Price.MIN, Price.MAX),
    dateFrom: humanizeTaskDueDate(getDate(false)),
    dateTo: humanizeTaskDueDate(getDate(true)),
    destination: destinationId,
    isFavorite: getRandomIntegerFromRange(0, 1),
    offers: offersIds,
    type
  }
);
