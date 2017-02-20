import parse from './response-parser';

const URL = '/bank_account/';

const defaultQuery = {
  disabled: false // TODO why we need this. There is no description of this parameter in REST API
};

export function fetchFactory(ajax) {
  return () => {
    const ajaxCfg = {
      method: 'GET',
      url: URL,
      query: defaultQuery
    };

    return ajax(ajaxCfg)
      .then(resp => parse(resp.data));
  };
}
