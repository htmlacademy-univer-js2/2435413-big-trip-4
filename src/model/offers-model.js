export default class OffersModel {
  #service = null;
  #offers = null;

  constructor(service) {
    this.#service = service;
    this.#offers = this.#service.offers;
  }

  get = () => this.#offers;

  getByType = (type) => this.#offers.find((offer) => offer.type === type).offers;
}
