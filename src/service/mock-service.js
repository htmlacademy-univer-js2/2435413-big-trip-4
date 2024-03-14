import { generateMockDestinations } from '../mock/destinations.js';
import { generateMockOffers } from '../mock/offers.js';
import { generateMockPoints } from '../mock/point.js';
import { getRandomArrayElement, getRandomIntegerFromRange } from '../utils.js';
import { COUNT_POINTS, CountOffers, TYPE_POINT } from '../const.js';

export default class MockService {
  destinations = [];
  offers = [];
  points = [];

  constructor() {
    this.destinations = this.generateDestinations();
    this.offers = this.generateOffers();
    this.points = this.generatePoints();
  }

  getDestinations = () => this.destinations;

  getOffers = () => this.offers;

  getPoints = () => this.points;

  generateDestinations = () => generateMockDestinations();

  generateOffers = () => TYPE_POINT.map((type) => {
    const length = getRandomIntegerFromRange(CountOffers.MIN, CountOffers.MAX);
    return {
      type,
      offers: Array.from({length: length}, () => generateMockOffers())
    };
  });

  generatePoints = () => Array.from({length: COUNT_POINTS}, () => {
    const type = getRandomArrayElement(TYPE_POINT);

    const destination = getRandomArrayElement(this.destinations);

    const hasOffers = getRandomIntegerFromRange(0, 1);

    const offersByType = this.offers.find((offer) => offer.type === type);

    let offerIds = [];

    if (hasOffers) {
      offerIds = offersByType.offers.map((offer) => offer.id);
    }

    return generateMockPoints(type, destination.id, offerIds);
  });
}
