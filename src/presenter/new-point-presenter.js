import PointEditView from '../view/point-edit-view.js';
import { Mode, UpdateType, UserAction } from '../const.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import { isEscapeKey } from '../utils/utils.js';
import Observable from '../framework/observable.js';

export default class NewPointPresenter extends Observable{
  #destinationsModel = null;
  #offersModel = null;
  #point = null;

  #dataChangeHandler = null;

  #eventListComponent = null;
  #pointEditComponent = null;
  #newPointButtonComponent = null;

  constructor(destinationsModel, offersModel, eventListComponent, dataChangeHandler, newPointButtonComponent) {
    super();

    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#eventListComponent = eventListComponent;
    this.#newPointButtonComponent = newPointButtonComponent;

    this.#dataChangeHandler = dataChangeHandler;
  }

  setSaving() {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true
    });
  }

  setDeleting() {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isDeleting: true
    });
  }

  setAborting() {
    this.#pointEditComponent.shake(this.#resetFormState);
  }

  init = (point) => {
    this.#point = point;

    this.#renderPoint(
      this.#point,
      this.#destinationsModel.get(),
      this.#offersModel.get());
  };

  destroy = () => {
    if (this.#pointEditComponent) {
      this.#resetClickHandler();
    }
  };

  #resetFormState = () => {
    this.#pointEditComponent.updateElement({
      isDisabled: false,
      isSaving: false,
      isDeleting: false
    });
  };

  #renderPoint = (point, destinations, offers) => {
    this.#pointEditComponent = new PointEditView(
      point,
      destinations,
      offers,
      this.#resetClickHandler,
      this.#formSubmitHandler,
      this.#resetClickHandler,
      true
    );

    render(this.#pointEditComponent, this.#eventListComponent.element, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#handleKeyDown);
    this._mode = Mode.EDIT;
  };

  #handleKeyDown = (evt) => {
    if (isEscapeKey(evt.key)) {
      this.#resetClickHandler();
    }
  };

  #formSubmitHandler = (updatedPoint) => {
    this.#dataChangeHandler(
      UserAction.CREATE_POINT,
      UpdateType.MINOR,
      updatedPoint
    );
  };

  #resetClickHandler = () => {
    remove(this.#pointEditComponent);
    this.#newPointButtonComponent.setDisabled(false);
    document.removeEventListener('keydown', this.#handleKeyDown);
  };
}
