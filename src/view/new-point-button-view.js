import AbstractView from '../framework/view/abstract-view.js';

const createNewPointButtonTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class NewPointButtonView extends AbstractView {
  constructor(onPointButtonClick) {
    super();

    this.element.addEventListener('click', onPointButtonClick);
  }

  get template() {
    return createNewPointButtonTemplate();
  }
}
