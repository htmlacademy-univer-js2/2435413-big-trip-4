import he from 'he';
import flatpickr from 'flatpickr';
import { PointType, ButtonLabel } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { isEmptyEventDetails } from '../utils/point-utils.js';
import { humanizeTaskDueDate } from '../utils/time-utils.js';

import 'flatpickr/dist/flatpickr.min.css';

const createPointEditButtonsTemplate = (isEmptyPoint, isDisabled, isSaving, isDeleting) => {
  const saveLabel = isSaving ? ButtonLabel.SAVE_IN_PROGRESS : ButtonLabel.SAVE;

  let resetLabel;
  if (!isEmptyPoint) {
    resetLabel = isDeleting ? ButtonLabel.DELETE_IN_PROGRESS : ButtonLabel.DELETE;
  } else {
    resetLabel = ButtonLabel.CANCEL;
  }

  return `
    <button
      class="event__save-btn  btn  btn--blue"
      type="submit"
      ${isDisabled ? 'disabled' : ''}
    >
      ${saveLabel}
    </button>
    <button
      class="event__reset-btn"
      type="reset"
    >
      <span ${isDisabled ? 'disabled' : ''}>${resetLabel}</span>
    </button>
    ${!isEmptyPoint ? `
      <button
        class="event__rollup-btn"
        type="button"
      >
        <span class="visually-hidden" ${isDisabled ? 'disabled' : ''}>Open event</span>
      </button>`
    : ''}
  `;
};

const createPicturesTemplate = (pictures) => {
  let result = '';

  if (pictures.length) {
    pictures.forEach((picture) => (result += `<img class="event__photo" src=${picture.src} alt="Event photo">`));

    return `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${result}
      </div>
    </div>
    `;
  }

  return result;
};

const createDestinationTemplate = (pointDestination) => {
  if (!pointDestination.description && !pointDestination.pictures.length) {
    return '';
  }

  return `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${pointDestination ? pointDestination.description : ''}</p>
    ${createPicturesTemplate(pointDestination ? pointDestination.pictures : '')}
  </section>
  `;
};

const createEventTypeTemplate = () => {
  let result = '';

  Object.values(PointType).forEach((type, index) => {
    const lowerCaseTypeName = type.toLowerCase();

    result += `<div class="event__type-item">
    <input id="event-type-${lowerCaseTypeName}-${index + 1}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
    <label class="event__type-label  event__type-label--${lowerCaseTypeName}" for="event-type-${lowerCaseTypeName}-${index + 1}">${type}</label>
  </div>`;
  });

  return result;
};

const createOffersTemplate = (offers, checkedOfferIds) => {
  if (offers.length === 0) {
    return '';
  }

  let result = '';

  Object.values(offers).forEach((offer) => {
    const isCheck = checkedOfferIds.includes(offer.id) ? 'checked' : '';

    result += `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox" name="event-offer-luggage" ${isCheck}>
    <label class="event__offer-label" for="${offer.id}">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`;
  });

  return `
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">${result}</div>
  </section>
  `;
};

const createEventDetails = (pointOffers, pointDestination, checkedOfferIds) => `
<section class="event__details">
  ${createOffersTemplate(pointOffers, checkedOfferIds)}
  ${pointDestination ? createDestinationTemplate(pointDestination) : '' }
</section>
`;

const createDestinationList = (destinations) => {
  let result = '';

  destinations.forEach((city) => {
    result += `<option value="${city.name}"></option>`;
  });

  return result;
};

const createPointEditTemplate = (state, destinations, offers, isEmptyPoint) => {
  const point = state.point;
  const pointDestination = destinations.find((dest) => dest.id === point.destination);
  const pointOffers = offers.find((offer) => offer.type === point.type).offers;
  const checkedOfferIds = pointOffers.filter(({ id }) => point.offers.includes(id)).map(({ id }) => id);

  return `
  <li class="trip-events__item">
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
            ${createEventTypeTemplate(pointOffers, point.type)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${point.type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${pointDestination ? he.encode(pointDestination.name) : ''}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${createDestinationList(destinations)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeTaskDueDate(point.dateFrom)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeTaskDueDate(point.dateTo)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${point.basePrice}" ${point.basePrice}>
      </div>
      ${createPointEditButtonsTemplate(isEmptyPoint, state.isDisabled, state.isSaving, state.isDeleting)}
    </header>
    ${isEmptyEventDetails(pointOffers, pointDestination) ? createEventDetails(pointOffers, pointDestination, checkedOfferIds) : ''}
  </form>
  </li>
  `;
};

export default class PointEditView extends AbstractStatefulView {
  #point = null;
  #destinations = null;
  #offers = null;
  #pointDestination = null;
  #pointOffers = null;

  #resetClickHandler = null;
  #formSubmitHandler = null;
  #deleteClickHandler = null;

  #datepickerFrom = null;
  #datepickerTo = null;
  #isEmptyPoint = null;

  constructor(point, destinations, offers, resetClickHandler, formSubmitHandler, deleteClickHandler, isEmptyPoint) {
    super();

    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#isEmptyPoint = isEmptyPoint;

    this.#resetClickHandler = resetClickHandler;
    this.#formSubmitHandler = formSubmitHandler;
    this.#deleteClickHandler = deleteClickHandler;

    this._setState({point: point, isDisabled: false, isSaving: false, isDeleting: false});
    this._restoreHandlers();
  }

  get isDisabled() {
    return this._state.isDisabled;
  }

  get isSaving() {
    return this._state.isSaving;
  }

  get isDeleting() {
    return this._state.isDeleting;
  }

  get template() {
    return createPointEditTemplate(this._state, this.#destinations, this.#offers, this.#isEmptyPoint);
  }

  removeElement() {
    super.removeElement();

    if(this.#datepickerFrom || this.#datepickerTo) {
      this.#datepickerFrom.destroy();
      this.#datepickerTo.destroy();
      this.#datepickerFrom = null;
      this.#datepickerTo = null;
    }
  }

  _restoreHandlers = () => {
    const offers = this.element.querySelector('.event__available-offers');

    if (this.#isEmptyPoint) {
      this.element
        .querySelector('.event__reset-btn')
        .addEventListener('click', this.#onResetClick);
    } else {
      this.element
        .querySelector('.event__rollup-btn')
        .addEventListener('click', this.#onResetClick);

      this.element
        .querySelector('.event__reset-btn')
        .addEventListener('click', this.#onDeleteClick);
    }

    if (offers) {
      offers.addEventListener('change', this.#onOfferChange);
    }

    this.element
      .querySelector('form')
      .addEventListener('submit', this.#onFormSubmit);

    this.element
      .querySelectorAll('.event__type-input')
      .forEach((eventType) => eventType
        .addEventListener('change', this.#onTypeChange));

    this.element
      .querySelector('.event__input--price')
      .addEventListener('change', this.#onPriceChange);

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#onDestinationChange);

    this.#setDatepickers();
  };

  #setDatepickers = () => {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');
    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {
        firstDayOfWeek: 1,
      },
      'time_24hr': true
    };

    this.#datepickerFrom = flatpickr(
      dateFromElement,
      {
        ...commonConfig,
        defaultDate: this._state.point.dateFrom,
        onClose: this.#dateFromCloseHandler,
        maxDate: this._state.point.dateTo
      }
    );

    this.#datepickerTo = flatpickr(
      dateToElement,
      {
        ...commonConfig,
        defaultDate: this._state.point.dateTo,
        onClose: this.#dateToCloseHandler,
        minDate: this._state.point.dateFrom
      }
    );
  };

  #onTypeChange = (evt) => {
    const type = evt.target.value.toLowerCase();
    this.#pointOffers = this.#offers.find((offer) => offer.type === type).offers;
    const offersIds = this.#pointOffers.map((offer) => offer.id);

    this.updateElement({ point: {
      ...this._state.point,
      type: type,
      offers: offersIds}
    });
  };

  #onDestinationChange = (evt) => {
    this.#pointDestination = this.#destinations.find((dest) => dest.name === evt.target.value);

    if (this.#pointDestination) {
      this.updateElement({point:{
        ...this._state.point,
        destination: this.#pointDestination.id
      }});
    }
  };

  #onOfferChange = () => {
    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox'));

    this._setState({
      point: {
        ...this._state.point,
        offers: checkedBoxes.filter((element) => element.checked).map((offer) => offer.id)
      }
    });
  };

  #onPriceChange = (evt) => {
    this._setState({
      point: {
        ...this._state.point,
        basePrice: Number(evt.target.value)
      }
    });
  };

  #onResetClick = () => {
    this.updateElement({ point: this.#point });
    this.#resetClickHandler(this.#isEmptyPoint);
  };

  #onDeleteClick = () => this.#deleteClickHandler(this.#point);

  #onFormSubmit = (evt) => {
    evt.preventDefault();
    this.#point = this._state.point;
    this.#formSubmitHandler(this.#point);
  };

  #dateFromCloseHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateFrom: userDate
      }
    });

    this.#datepickerTo.set('minDate', this._state.point.dateFrom);
  };

  #dateToCloseHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateTo: userDate
      }
    });

    this.#datepickerFrom.set('maxDate', this._state.point.dateTo);
  };
}
