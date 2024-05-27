export const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

export const getRandomIntegerFromRange = (start, end) => Math.ceil(Math.random() * (end - start + 1)) + start - 1;

export const isEscapeKey = (key) => key === 'Escape';

export const upperFirst = (str) => str[0].toUpperCase() + str.slice(1);
