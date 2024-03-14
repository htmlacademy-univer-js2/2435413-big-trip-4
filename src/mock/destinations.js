import { getRandomArrayElement, getRandomIntegerFromRange } from '../utils.js';
import { DESCRIPTIONS, CITIES, CountPictures } from '../const.js';

const generateMockPhotos = (count, city) => Array.from({length: count}, (_, index) => (
  {
    src: `https://loremflickr.com/248/152?random=${index}`,
    description: `${city} description`
  }
));

export const generateMockDestinations = () => CITIES.map((city) => (
  {
    id: crypto.randomUUID(),
    description: getRandomArrayElement(DESCRIPTIONS),
    name: city,
    pictures: generateMockPhotos(getRandomIntegerFromRange(CountPictures.MIN, CountPictures.MAX), city)
  }));
