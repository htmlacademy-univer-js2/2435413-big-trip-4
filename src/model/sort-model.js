import { SortType } from '../const.js';
import Observable from '../framework/observable.js';

export default class SortModel extends Observable {
  #sort = SortType.DAY;

  get = () => this.#sort;

  set(updateType, update) {
    this.#sort = update;
    this._notify(updateType);
  }
}
