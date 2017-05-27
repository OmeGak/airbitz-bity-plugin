import { exchangeDirection as exchangeDirections } from '../../common-data/currencies';

// TODO get rid of 'fromCreateBankRoute'
export const backToConvertPageLink = {
  pathname: '/convert',
  state: {
    fromCreateBankRoute: true,
    exchangeDirection: exchangeDirections.CRYPTO_TO_FIAT
  }
};
