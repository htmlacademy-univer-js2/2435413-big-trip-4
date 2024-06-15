const Duration = {
  MIN: 60,
  HOUR: 10,
  DAY: 3
};

const Mode = {
  DEFAULT: 'default',
  EDIT: 'edit',
  EMPTY_LIST: 'emptyList'
};

const POINT_EMPTY = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  isFavorite: false,
  destination: null,
  offers: [],
  type: 'flight'
};

const DateFormat = {
  LONG: 'YYYY-MM-DDTHH:mm',
  SHORT: 'MMM DD'
};

const SortType = {
  DAY: 'Day',
  EVENT: 'Event',
  TIME: 'Time',
  PRICE: 'Price',
  OFFERS: 'Offers'
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const PointType = {
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

const FilterType = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future',
  PRESENT: 'Present',
  PAST: 'Past'
};

const UpdateType = {
  PATCH: 'Patch',
  MINOR: 'Minor',
  MAJOR: 'Major',
  INIT: 'Init'
};

const ButtonLabel = {
  CANCEL: 'Cancel',
  DELETE: 'Delete',
  SAVE: 'Save',
  DELETE_IN_PROGRESS: 'Deleting...',
  SAVE_IN_PROGRESS: 'Saving...'
};

const UserAction = {
  UPDATE_POINT: 'update',
  DELETE_POINT: 'delete',
  CREATE_POINT: 'create'
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

const Filters = {
  'Everything': 'Click New Event to create your first point',
  'Future': 'There are no future events now',
  'Present': 'There are no present events now',
  'Past': 'There are no past events now'
};

const MILLISECONDS_IN_DAY = 86400000;

const MILLISECONDS_IN_HOUR = 3600000;

export {
  Duration,
  Mode,
  POINT_EMPTY,
  DateFormat,
  SortType,
  TimeLimit,
  PointType,
  FilterType,
  UpdateType,
  ButtonLabel,
  UserAction,
  Method,
  Filters,
  MILLISECONDS_IN_DAY,
  MILLISECONDS_IN_HOUR
};
