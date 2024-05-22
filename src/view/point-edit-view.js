import { POINT_EMPTY, TYPE_POINT, CITIES } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

const createPicturesTemplate = (pictures) => {
  let result = '';

  if (pictures.length) {
    pictures.forEach((picture) => (result += `<img class="event__photo" src=${picture.src} alt="Event photo">`));

    return `<div class="event__photos-container">
              <div class="event__photos-tape">
                ${result}
              </div>
            </div>`;
  }

  return result;
};

const createEventTypeTemplate = () => {
  let result = '';
  let typeL = '';

  Object.values(TYPE_POINT).forEach((type, index) => {
    typeL = type.toLowerCase();

    result += `<div class="event__type-item">
    <input id="event-type-${typeL}-${index + 1}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
    <label class="event__type-label  event__type-label--${typeL}" for="event-type-${typeL}-${index + 1}">${type}</label>
  </div>`;
  });

  return result;
};

const createDestinationList = () => {
  let result = '';

  CITIES.forEach((city) => (result += `<option value="${city.name}"></option>`));

  return result;
};

const createOffersTemplate = (offers) => {
  let result = '';

  offers.forEach((offer, index) => {
    result += `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${index + 1}" type="checkbox" name="event-offer-luggage" checked>
    <label class="event__offer-label" for="event-offer-luggage-${index + 1}">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`;
  });

  return result;
};

const createPointEditTemplate = (point, destination, offers) => `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createEventTypeTemplate(offers, point.type)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${point.type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${createDestinationList(destination)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${createOffersTemplate(offers)}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>
        ${createPicturesTemplate(destination.pictures)}
      </section>
    </section>
  </form>
  </li>`;

export default class PointEditView extends AbstractStatefulView {
  #point = null;
  #pointDestination = null;
  #pointOffers = null;

  #onResetClick = null;
  #onFormSubmit = null;

  #destinationsModel = null;
  #offersModel = null;

  #currentType = null;

  constructor(point = POINT_EMPTY, pointDestination, pointOffers, onResetButtonClick, onFormSubmit, destinationsModel, offersModel) {
    super();

    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;

    this.#onResetClick = onResetButtonClick;
    this.#onFormSubmit = onFormSubmit;

    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this._setState({point: point});
    this._restoreHandlers();
  }

  #typeChangeHandler = (evt) => {
    this.#currentType = evt.target.value;
    this.#pointOffers = this.#offersModel.getByType(this.#currentType);

    const offersIds = this.#pointOffers.map((offer) => offer.id);

    this.updateElement({ point: {
      ...this._state.point,
      type: this.#currentType,
      offers: offersIds}
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();

    this.#pointDestination = this.#destinationsModel.get().find((destination) => destination.name === evt.target.value);

    if (this.#pointDestination) {
      this.updateElement({point:{
        ...this._state.point,
        destination: this.#pointDestination.id
      }});
    }
  };

  #offerChangeHandler = () => {
    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox'));

    this._setState({
      point: {
        ...this._state.point,
        offers: checkedBoxes.map((element) => element.dataset.offerId)
      }
    });
  };

  #priceChangeHandler = (evt) => {
    this._setState({
      point: {
        ...this._state.point,
        basePrice: evt.target.valueAsNumber
      }
    });
  };

  #handleResetClick = () => {
    this.updateElement({ point: this.#point });
    this.#onResetClick();
  };

  #handleSaveClick = (evt) => {
    evt.preventDefault();
    this.#point = this._state.point;
    this.#onFormSubmit({...this.#point});
  };

  _restoreHandlers = () => {
    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', this.#handleResetClick);

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#handleResetClick);

    this.element
      .querySelector('form')
      .addEventListener('submit', this.#handleSaveClick);

    this.element
      .querySelectorAll('.event__type-input')
      .forEach((eventType) => eventType
        .addEventListener('change', this.#typeChangeHandler));

    this.element
      .querySelector('.event__input')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element
      .querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);

    this.element
      .querySelector('.event__available-offers')
      .addEventListener('change', this.#offerChangeHandler);
  };

  get template() {
    return createPointEditTemplate(this._state.point, this.#pointDestination, this.#pointOffers);
  }
}
