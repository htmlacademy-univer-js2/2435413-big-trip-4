export default class OffersModel {
  #service = null;
  #offers = [];

  constructor(service) {
    this.#service = service;
  }

  async init() {
    this.#offers = await this.#service.offers;
    return this.#offers;
  }

  get = () => this.#offers;

  getByType = (type) => this.#offers.find((offer) => offer.type === type).offers;
}
