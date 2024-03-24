export default class DestinationsModel {
  #service = null;
  #destinations = null;

  constructor(service) {
    this.#service = service;
    this.#destinations = this.#service.destinations;
  }

  get = () => this.#destinations;

  getById = (id) => this.#destinations.find((destination) => destination.id === id);
}
