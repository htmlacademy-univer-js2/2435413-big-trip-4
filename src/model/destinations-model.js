export default class DestinationsModel {
  constructor(service) {
    this.service = service;
    this.destinations = this.service.getDestinations();
  }

  get = () => this.destinations;

  getById = (id) => this.destinations.find((destination) => destination.id === id);
}
