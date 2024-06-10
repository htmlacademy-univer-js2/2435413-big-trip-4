export const Duration = {
  MIN: 60,
  HOUR: 10,
  DAY: 3
};

export const Mode = {
  DEFAULT: 'default',
  EDIT: 'edit',
  EMPTY_LIST: 'emptyList'
};

export const POINT_EMPTY = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  isFavorite: false,
  destination: null,
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

export const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export const PointType = {
  TAXI: 'Taxi',
  BUS: 'Bus',
  TRAIN: 'Train',
  SHIP: 'Ship',
  DRIVE: 'Drive',
  FLIGHT: 'Flight',
  CHECK_IN: 'Check-in',
  SIGHTSEEING: 'Sightseeing',
  RESTAURANT: 'Restaurant'
};

export const FilterType = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future',
  PRESENT: 'Present',
  PAST: 'Past'
};

export const UpdateType = {
  PATCH: 'Patch',
  MINOR: 'Minor',
  MAJOR: 'Major',
  INIT: 'Init'
};

export const ButtonLabel = {
  CANCEL: 'Cancel',
  DELETE: 'Delete',
  SAVE: 'Save',
  DELETE_IN_PROGRESS: 'Deleting...',
  SAVE_IN_PROGRESS: 'Saving...'
};

export const UserAction = {
  UPDATE_POINT: 'update',
  DELETE_POINT: 'delete',
  CREATE_POINT: 'create'
};

export const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

export const Filters = {
  'Everything': 'Click New Event to create your first point',
  'Future': 'There are no future events now',
  'Present': 'There are no present events now',
  'Past': 'There are no past events now'
};

export const MILLISECONDS_IN_DAY = 86400000;

export const MILLISECONDS_IN_HOUR = 3600000;
