import AbstractView from '../framework/view/abstract-view.js';

const createEventSortTemplate = () => '<form class="trip-events__trip-sort  trip-sort" action="#" method="get"></form>';

export default class EventSortView extends AbstractView{
  get template() {
    return createEventSortTemplate();
  }
}
