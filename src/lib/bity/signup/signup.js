import * as parser from './signup-2-response-parser';

const URL = '/user_signup/user_signup/';

export default function signupRequestFactory(ajax) {
  return (data) => {
    const { username, email, password, affiliateCode, clientId } = data;

    const requestData = {
      username,
      email,
      password
    };

    if (typeof affiliateCode === 'string' && affiliateCode.length > 0) {
      requestData.code = affiliateCode;
    }

    if (typeof clientId === 'string' && clientId.length > 0) {
      requestData.client_id = clientId;
    }

    const ajaxCfg = {
      method: 'POST',
      url: URL,
      data: requestData
    };

    return ajax(ajaxCfg)
      .then(resp => parser.parseSuccessResponse(resp.data))
      .catch(resp => Promise.reject(parser.parseErrorResponse(resp.data)));
  };
}
