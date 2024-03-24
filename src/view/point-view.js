import AbstractView from '../framework/view/abstract-view.js';
import { formatToShortDate, getDuration, formatToShortTime } from '../utils.js';

const createFavoriteButtonTemplate = (isFavorite) => `
  <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
    </svg>
  </button>`;

const createOfferTemplate = (offers) => {
  let result = '';

  for (let i = 0; i < offers.length; i++) {
    result += `
    <li class="event__offer">
      <span class="event__offer-title">${offers[i].title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offers[i].price}</span>
    </li>`;
  }

  return result;
};

const createPointTemplate = (point, destination, offers) => `
  <li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${point.dateTo}">${formatToShortDate(point.dateTo)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${point.type} ${destination.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${point.dateTo}">${formatToShortTime(point.dateTo)}</time>
        &mdash;
        <time class="event__end-time" datetime="${point.dateFrom}">${formatToShortTime(point.dateFrom)}</time>
      </p>
      <p class="event__duration">${getDuration(point.dateFrom, point.dateTo)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${point.basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${createOfferTemplate(offers)}
    </ul>
      ${createFavoriteButtonTemplate(point.isFavorite)}
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
  </li>`;

export default class PointView extends AbstractView {
  #point = null;
  #pointDestination = null;
  #pointOffers = null;

  constructor(point, destination, offers, onRollupButtonClick) {
    super();

    this.#point = point;
    this.#pointDestination = destination;
    this.#pointOffers = offers;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', onRollupButtonClick);
  }

  get template() {
    return createPointTemplate(this.#point, this.#pointDestination, this.#pointOffers);
  }
}
