export default class DestinationsModel {
  #service = null;
  #destinations = [];

  constructor(service) {
    this.#service = service;
  }

  get = () => this.#destinations;

  getById = (id) => this.#destinations.find((destination) => destination.id === id);

  async init() {
    this.#destinations = await this.#service.destinations;
    return this.#destinations;
  }
}
