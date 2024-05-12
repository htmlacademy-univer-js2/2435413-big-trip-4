import { TITLE_OFFERS, Price } from '../const.js';
import { getRandomArrayElement, getRandomIntegerFromRange } from '../utils/utils.js';

export const generateMockOffers = () => (
  {
    id: crypto.randomUUID(),
    title: getRandomArrayElement(TITLE_OFFERS),
    price: getRandomIntegerFromRange(Price.MIN, Price.MAX)
  }
);
