import React, { PropTypes, Component } from 'react';
import { withRouter } from 'react-router';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { fiatCurrencies, currencies } from '../../../common-data/currencies';
import countries from './countries';
import Page from '../../../lib/page';
import PageLoader from '../../../lib/page-loader';
import Spinner from '../../../lib/spinner';
import { Card, CardHeader, CardBody } from '../../../lib/card';
import Link from '../../../lib/link';

import { backToConvertPageLink } from '../constants';
import styles from './styles.less';

const propTypes = {
  location: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  isPreparationStarted: PropTypes.bool.isRequired,
  isPreparationFailed: PropTypes.bool.isRequired,
  inProgress: PropTypes.bool.isRequired,
  onMounted: PropTypes.func.isRequired,
  onUnmounted: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

const emptyCountryData = {
  code: 'EMPTY_COUNTRY',
  name: '- Choose a country -'
};

const formGroupClassName = `form-group ${styles.formGroup}`;

const notEmptyString = v => typeof v === 'string' && v.length > 0;

const baseFormValidators = {
  bankName: {
    required: notEmptyString
  },
  bicOrSwift: {
    required: notEmptyString
  },
  iban: {
    required: notEmptyString
  },
  accountHolderName: {
    required: notEmptyString
  }
};

class CreateBankAccountPage extends Component {
  static propTypes = propTypes;

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onChange = this.onChange.bind(this);

    const { location: { state: { currencyCode: inputCurrencyCode } = {} } } = props;
    const isValidInputCurrencyCode = fiatCurrencies.some(({ code }) => code === inputCurrencyCode);
    const currencyCode = isValidInputCurrencyCode ? inputCurrencyCode : fiatCurrencies[0].code;

    this.formInitialState = {
      country: emptyCountryData.code,
      currencyCode
    };

    this.state = {
      isValid: false,
      addressIsRequired: isAddressRequired(currencyCode)
    };
  }

  componentDidMount() {
    this.props.onMounted(this.props.router);
  }

  componentWillUnmount() {
    this.props.onUnmounted();
  }

  onSubmit(rawData) {
    const addressFields = [
      'address1',
      'address2',
      'zipCode',
      'state',
      'city',
      'country'
    ];

    let data;

    if (!this.state.addressIsRequired) {
      // get rid of address fields
      data = Object.keys(rawData)
        .filter(key => addressFields.indexOf(key) === -1)
        .reduce((acc, key) => {
          acc[key] = rawData[key];
          return acc;
        }, {});
    } else {
      // replace `emptyCountryData.code` by empty string
      const { country: rawCountryValue } = rawData;
      const country = rawCountryValue === emptyCountryData.code ? '' : rawCountryValue;
      data = {
        ...rawData,
        country
      };
    }

    this.props.onSubmit(data);
  }

  onUpdate({ $form }) {
    this.setState({
      isValid: $form.valid
    });
  }

  onChange({ currencyCode }) {
    this.setState({
      addressIsRequired: isAddressRequired(currencyCode)
    });
  }

  render() {
    if (this.props.isPreparationStarted) {
      return (
        <PageLoader />
      );
    }

    if (this.props.isPreparationFailed) {
      return (
        <Page>
          <Card>
            <CardHeader>Error</CardHeader>
            <CardBody className={styles.errorCardBody}>
              <div>Page can&lsquo;t be loaded</div>
            </CardBody>
          </Card>
        </Page>
      );
    }

    const disableSubmitBtn = !this.state.isValid || this.props.inProgress;

    const addressFormNode = this.state.addressIsRequired ? (<AddressForm />) : null;

    const currencyOptionNodes = Object.keys(fiatCurrencies)
      .map(key => fiatCurrencies[key])
      .map(({ code }) => (<option key={code} value={code}>{code}</option>));

    const submitBtnContent = createSubmitBtnContent(this.props.inProgress);

    return (
      <Page>
        <Card>
          <CardHeader>
            <span>Add bank account</span>
          </CardHeader>
          <CardBody>
            <LocalForm noValidate
              onSubmit={this.onSubmit} onUpdate={this.onUpdate} onChange={this.onChange}
              validators={baseFormValidators} initialState={this.formInitialState}>
              {/* base form */}
              <div>
                <div className={formGroupClassName}>
                  <label htmlFor="personal-label">Personal label</label>
                  <Control.text model=".personalLabel" className="form-control" id="personal-label" />
                </div>

                <div className={formGroupClassName}>
                  <label htmlFor="bank-name">Bank Name</label>
                  <Control.text model=".bankName" className="form-control" id="bank-name" />
                  <Errors
                    className={styles.errorMsg}
                    model=".bankName"
                    messages={{
                      required: 'This field is required'
                    }}
                    show={{ touched: true, focus: false }}
                  />
                </div>

                <div className={formGroupClassName}>
                  <label htmlFor="bic-or-swift">BIC or SWIFT</label>
                  <Control.text model=".bicOrSwift" className="form-control" id="bic-or-swift" />
                  <Errors
                    className={styles.errorMsg}
                    model=".bicOrSwift"
                    messages={{
                      required: 'This field is required'
                    }}
                    show={{ touched: true, focus: false }}
                  />
                </div>

                <div className={formGroupClassName}>
                  <label htmlFor="iban">IBAN</label>
                  <Control.text model=".iban" className="form-control" id="iban" />
                  <Errors
                    className={styles.errorMsg}
                    model=".iban"
                    messages={{
                      required: 'This field is required'
                    }}
                    show={{ touched: true, focus: false }}
                  />
                </div>

                <div className={formGroupClassName}>
                  <label htmlFor="currency">Currency</label>
                  <Control.select model=".currencyCode" className="form-control" id="currency">
                    {currencyOptionNodes}
                  </Control.select>
                </div>

                <div className={formGroupClassName}>
                  <label htmlFor="account-holder-name">Account holder name</label>
                  <Control.text model=".accountHolderName" className="form-control" id="account-holder-name" />
                  <Errors
                    className={styles.errorMsg}
                    model=".accountHolderName"
                    messages={{
                      required: 'This field is required'
                    }}
                    show={{ touched: true, focus: false }}
                  />
                </div>
              </div>
              {/* / base form */}

              {/* address form */}
              {addressFormNode}
              {/* / address form */}

              {/* footer */}
              <div className={styles.footer}>
                <Link to={backToConvertPageLink} replace
                  className={`btn btn-primary ${styles.cancelBtn}`}>Cancel</Link>
                <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={disableSubmitBtn}>
                  {submitBtnContent}
                </button>
              </div>
              {/* /footer */}
            </LocalForm>
          </CardBody>
        </Card>
      </Page>
    );
  }
}

export default withRouter(CreateBankAccountPage);

const addressFormValidators = {
  address1: {
    required: notEmptyString
  },
  zipCode: {
    required: notEmptyString
  },
  city: {
    required: notEmptyString
  },
  country: {
    required: v => v !== emptyCountryData.code
  }
};

function AddressForm() {
  const countryOptionNodes = [].concat(emptyCountryData, countries).map(({ code, name }) =>
    (<option key={code} value={code}>{name}</option>)
  );

  return (
    <div>
      <div className={formGroupClassName}>
        <label htmlFor="address-line-1">Address line 1</label>
        <Control.text className="form-control" id="address-line-1"
          model=".address1" validators={addressFormValidators.address1} />
        <Errors
          className={styles.errorMsg}
          model=".address1"
          messages={{
            required: 'This field is required'
          }}
          show={{ touched: true, focus: false }}
        />
      </div>

      <div className={formGroupClassName}>
        <label htmlFor="address-line-2">Address line 2</label>
        <Control.text model=".address2" className="form-control" id="address-line-2" />
      </div>

      <div className={formGroupClassName}>
        <label htmlFor="zip-code">Zip code</label>
        <Control.text className="form-control" id="zip-code"
          model=".zipCode" validators={addressFormValidators.zipCode} />
        <Errors
          className={styles.errorMsg}
          model=".zipCode"
          messages={{
            required: 'This field is required'
          }}
          show={{ touched: true, focus: false }}
        />
      </div>

      <div className={formGroupClassName}>
        <label htmlFor="state">State</label>
        <Control.text model=".state" className="form-control" id="state" />
      </div>

      <div className={formGroupClassName}>
        <label htmlFor="city">City</label>
        <Control.text className="form-control" id="city"
          model=".city" validators={addressFormValidators.city} />
        <Errors
          className={styles.errorMsg}
          model=".city"
          messages={{
            required: 'This field is required'
          }}
          show={{ touched: true, focus: false }}
        />
      </div>

      <div className={formGroupClassName}>
        <label htmlFor="country">Country</label>
        <Control.select className="form-control" id="country"
          model=".country" validators={addressFormValidators.country}>
          {countryOptionNodes}
        </Control.select>
        <Errors
          className={styles.errorMsg}
          model=".country"
          messages={{
            required: 'This field is required'
          }}
          show={{ touched: true, focus: false }}
        />
      </div>
    </div>
  );
}

function createSubmitBtnContent(inProgress) { // eslint-disable-line react/prop-types
  if (inProgress) {
    return (
      <span className={styles.loading}>
        <Spinner type="inline" />
        <span>Saving...</span>
      </span>
    );
  }
  return (
    <span>Save</span>
  );
}

function isAddressRequired(currencyCode) {
  return currencyCode === currencies.CHF.code;
}
