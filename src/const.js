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

export const TYPE_POINT = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

export const CITIES = ['Abing', 'Bela', 'Santana do Livramento', 'Queimados', 'Yima', 'Cizre', 'Hwado'];

export const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.'];

export const TITLE_OFFERS = ['Upgrade to a business class', 'Add luggage', 'Add meal', 'Choose seats', 'Travel by train'];

export const COUNT_POINTS = 3;

export const MILLISECONDS_IN_DAY = 86400000;

export const MILLISECONDS_IN_HOUR = 3600000;
