export const CountPoints = {
  MIN: 0,
  MAX: 4
};

export const CountPictures = {
  MIN: 0,
  MAX: 5
};

export const CountOffers = {
  MIN: 1,
  MAX: 5
};

export const Price = {
  MIN: 0,
  MAX: 1000
};

export const Duration = {
  MIN: 60,
  HOUR: 10,
  DAY: 3
};

export const Mode = {
  DEFAULT: 'default',
  EDIT: 'edit'
};

export const POINT_EMPTY = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: 'flight'
};

export const DateFormat = {
  LONG: 'YYYY-MM-DDTHH:mm',
  SHORT: 'MMM DD'
};

export const SortType = {
  DAY: 'Day',
  EVENT: 'Event',
  TIME: 'Time',
  PRICE: 'Price',
  OFFERS: 'Offers'
};

export const FILTERS = ['Everything', 'Future', 'Present', 'Past'];

export const Filters = {
  'Everything': 'Click New Event to create your first point',
  'Future': 'There are no future events now',
  'Present': 'There are no present events now',
  'Past': 'There are no past events now'
};

export const TYPE_POINT = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

export const CITIES = ['Abing', 'Bela', 'Santana do Livramento', 'Queimados', 'Yima', 'Cizre', 'Hwado'];

export const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.'];

export const TITLE_OFFERS = ['Upgrade to a business class', 'Add luggage', 'Add meal', 'Choose seats', 'Travel by train'];

export const MILLISECONDS_IN_DAY = 86400000;

export const MILLISECONDS_IN_HOUR = 3600000;
