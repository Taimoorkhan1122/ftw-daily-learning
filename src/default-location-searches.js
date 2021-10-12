import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
const defaultLocations = [
  {
    id: 'default-auckland',
    predictionPlace: {
      address: 'Auckland, New Zealand',
      bounds: new LatLngBounds(new LatLng(-36.545, 175.298), new LatLng(-37.047, 174.498)),
    },
  },
  {
    id: 'default-karachi',
    predictionPlace: {
      address: 'Karachi, Pakistan',
      bounds: new LatLngBounds(
        new LatLng(24.95394201, 67.13536953),
        new LatLng(24.76372534, 66.95375179)
      ),
    },
  },
  {
    id: 'default-tampere',
    predictionPlace: {
      address: 'Tampere, Finland',
      bounds: new LatLngBounds(new LatLng(61.83657, 24.11838), new LatLng(61.42728, 23.5422)),
    },
  },
  {
    id: 'default-oulu',
    predictionPlace: {
      address: 'Oulu, Finland',
      bounds: new LatLngBounds(new LatLng(65.56434, 26.77069), new LatLng(64.8443, 24.11494)),
    },
  },
  {
    id: 'default-ruka',
    predictionPlace: {
      address: 'Ruka, Finland',
      bounds: new LatLngBounds(new LatLng(66.16997, 29.16773), new LatLng(66.16095, 29.13572)),
    },
  },
];
export default defaultLocations;
