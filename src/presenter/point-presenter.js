import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import { Mode, UpdateType, UserAction } from '../const.js';
import { render, replace, remove, RenderPosition } from '../framework/render.js';
import { isEscapeKey } from '../utils/utils.js';
import { isBigDifference, isPointEmpty } from '../utils/point-utils.js';
import Observable from '../framework/observable.js';

export default class PointPresenter extends Observable{
  _mode = Mode.EMPTY_LIST;

  #destinationsModel = null;
  #offersModel = null;
  #point = null;

  #dataChangeHandler = null;
  #modeChangeHandler = null;

  #eventListComponent = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #prevPointComponent = null;
  #prevPointEditComponent = null;

  constructor(destinationsModel, offersModel, eventListComponent, dataChangeHandler, modeChangeHandler) {
    super();

    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#eventListComponent = eventListComponent;

    this.#dataChangeHandler = dataChangeHandler;
    this.#modeChangeHandler = modeChangeHandler;
  }

  setSaving() {
    if (this._mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isSaving: true
      });
    }
  }

  setDeleting() {
    if (this._mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true
      });
    }
  }

  setAborting() {
    if (this._mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };
    this.#pointEditComponent.shake(resetFormState);
  }

  #handleKeyDown = (evt) => {
    if (isEscapeKey(evt.key)) {
      document.removeEventListener('keydown', this.#handleKeyDown);
      this.#replaceFormToPoint();
    }
  };

  #replaceFormToPoint = () => {
    this._mode = Mode.DEFAULT;

    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#handleKeyDown);
  };

  #replacePointToForm = () => {
    this.#modeChangeHandler();

    this._mode = Mode.EDIT;

    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#handleKeyDown);
  };

  #formSubmitHandler = (updatedPoint) => {
    this.#dataChangeHandler(
      isPointEmpty(this.#point) ? UserAction.CREATE_POINT : UserAction.UPDATE_POINT,
      isBigDifference(this.#point, updatedPoint) ? UpdateType.MINOR : UpdateType.PATCH,
      updatedPoint
    );

    this.#replaceFormToPoint();
  };

  #deleteClickHandler = (point) => {
    this.#replaceFormToPoint();

    this.#dataChangeHandler(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #onRollupClick = () => {
    this.#replacePointToForm();
  };

  #resetClickHandler = () => {
    this.#replaceFormToPoint();
  };

  #renderPoint = (point, destination, offers) => {
    this.#prevPointComponent = this.#pointComponent;
    this.#prevPointEditComponent = this.#pointEditComponent;

    const onFavoriteCLick = () => {
      this.#dataChangeHandler(
        UserAction.UPDATE_POINT,
        UpdateType.PATCH,
        {...point, isFavorite: !point.isFavorite});
    };

    this.#pointComponent = new PointView(
      point,
      destination,
      offers,
      this.#onRollupClick,
      onFavoriteCLick
    );

    this.#pointEditComponent = new PointEditView(
      point,
      this.#destinationsModel.get(),
      this.#offersModel.get(),
      this.#resetClickHandler,
      this.#formSubmitHandler,
      this.#deleteClickHandler
    );

    if (this._mode === Mode.EMPTY_LIST) {
      render(this.#pointComponent, this.#eventListComponent.element);
      this._mode = Mode.DEFAULT;
      return;
    }

    if (this._mode === Mode.EMPTY_POINT) {
      render(this.#pointEditComponent, this.#eventListComponent.element, RenderPosition.AFTERBEGIN);
      this._mode = Mode.EDIT;
      return;
    }

    if (this._mode === Mode.DEFAULT){
      replace(this.#pointComponent, this.#prevPointComponent);
    }

    if (this._mode === Mode.EDIT){
      replace(this.#pointEditComponent, this.#prevPointEditComponent);
    }
  };

  init = (point) => {
    this.#point = point;

    this.#renderPoint(
      this.#point,
      this.#destinationsModel.getById(this.#point.destination),
      this.#offersModel.getByType(this.#point.type));
  };

  resetView = () => {
    if (this._mode === Mode.EDIT) {
      this.#resetClickHandler();
    }
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };
}
