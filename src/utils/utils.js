export const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

export const getRandomIntegerFromRange = (start, end) => Math.ceil(Math.random() * (end - start + 1)) + start - 1;

export const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

export const removeHandlerOnEscape = (cb) => document.removeEventListener('keydown', cb);

export const onEscapeKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    removeHandlerOnEscape(onEscapeKeyDown);
  }
};
