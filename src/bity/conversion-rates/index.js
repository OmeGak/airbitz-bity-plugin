import { fetchAllRatesFactory } from './conversion-rates';

export default function conversionRatesApiFactory(ajax) {
  return {
    fetchAllRates: fetchAllRatesFactory(ajax)
  };
}
