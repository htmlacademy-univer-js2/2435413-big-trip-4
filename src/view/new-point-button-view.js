import AbstractView from '../framework/view/abstract-view.js';

const createNewPointButtonTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class NewPointButtonView extends AbstractView {
  #newPointButtonClickHandler = null;

  constructor(newPointButtonClickHandler) {
    super();

    this.#newPointButtonClickHandler = newPointButtonClickHandler;
    this.element.addEventListener('click', this.#onNewPointButtonClick);
  }

  get template() {
    return createNewPointButtonTemplate();
  }

  setDisabled = (isDisabled) => {
    this.element.disabled = isDisabled;
  };

  #onNewPointButtonClick = () => {
    this.#newPointButtonClickHandler();
    this.element.disabled = true;
  };
}
