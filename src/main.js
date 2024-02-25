import BoardPresenter from './presenter/board-presenter.js';

const bodyElement = document.querySelector('body');
const mainElement = bodyElement.querySelector('.page-main');
const eventListElement = mainElement.querySelector('.trip-events');

const boardPresenter = new BoardPresenter({
  container: eventListElement
});

boardPresenter.init();
