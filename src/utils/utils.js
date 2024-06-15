const isEscapeKey = (key) => key === 'Escape';

const upperFirst = (str) => str[0].toUpperCase() + str.slice(1);

export {
  isEscapeKey,
  upperFirst
};
