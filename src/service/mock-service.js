import { generateMockDestinations } from '../mock/destinations.js';
import { generateMockOffers } from '../mock/offers.js';
import { generateMockPoints } from '../mock/point.js';
import { getRandomArrayElement, getRandomIntegerFromRange } from '../utils/utils.js';
import { CountPoints, CountOffers, PointType } from '../const.js';

export default class MockService {
  #destinations = [];
  #offers = [];
  #points = [];

  constructor() {
    this.#destinations = this.generateDestinations();
    this.#offers = this.generateOffers();
    this.#points = this.generatePoints();
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  get points() {
    return this.#points;
  }

  generateDestinations = () => generateMockDestinations();

  generateOffers = () => Object.values(PointType).map((type) => {
    const length = getRandomIntegerFromRange(CountOffers.MIN, CountOffers.MAX);
    return {
      type,
      offers: Array.from({length: length}, () => generateMockOffers())
    };
  });

  generatePoints = () => Array.from({length: getRandomIntegerFromRange(CountPoints.MIN, CountPoints.MAX)}, () => {
    const type = getRandomArrayElement(Object.values(PointType));

    const destination = getRandomArrayElement(this.destinations);

    const hasOffers = getRandomIntegerFromRange(0, 1);

    const offersByType = this.offers.find((offer) => offer.type === type);

    let offerIds = [];

    if (hasOffers) {
      offerIds = offersByType.offers.map((offer) => offer.id);
    }

    return generateMockPoints(type, destination.id, offerIds);
  });

  updatePoint(updatedPoint) {
    return updatedPoint;
  }

  addPoint(point) {
    return {...point};
  }

  deletePoint() {}
}
