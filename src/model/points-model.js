import { UpdateType } from '../const.js';
import Observable from '../framework/observable.js';
import { updateItem, adaptToServer, adaptToClient } from '../utils/point-utils.js';

export default class PointsModel extends Observable {
  #service = null;
  #destinationsModel = null;
  #offersModel = null;
  #points = [];

  constructor(service, destinationsModel, offersModel) {
    super();

    this.#service = service;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  get = () => this.#points;

  async init() {
    try {
      await Promise.all([
        this.#destinationsModel.init(),
        this.#offersModel.init()
      ]);
      const points = await this.#service.points;
      this.#points = points.map(adaptToClient);
      this._notify(UpdateType.INIT, {isError: false});
    } catch {
      this.#points = [];
      this._notify(UpdateType.INIT, {isError: true});
    }
  }

  async update(updateType, point) {
    try {
      const updatedPoint = await this.#service.updatePoint(adaptToServer(point, false));
      const adaptedPoint = adaptToClient(updatedPoint);
      this.#points = updateItem(this.#points, adaptedPoint);
      this._notify(updateType, adaptedPoint);
    } catch {
      throw new Error('Can\'t update point');
    }
  }

  async add(updateType, point) {
    try {
      const addedPoint = await this.#service.addPoint(adaptToServer(point, true));
      const adaptedPoint = adaptToClient(addedPoint);
      this.#points.push(adaptedPoint);
      this._notify(updateType, adaptedPoint);
    } catch {
      throw new Error('Can\'t add point');
    }
  }

  async delete(updateType, point) {
    try {
      await this.#service.deletePoint(point);
      this.#points = this.#points.filter((pointItem) => pointItem.id !== point.id);
      this._notify(updateType);
    } catch {
      throw new Error('Can\'t delete point');
    }
  }
}
