import * as parser from './signup-2-response-parser';

const URL = '/user_signup/user_signup/';

export default function signupRequestFactory(ajax) {
  return (data) => {
    const { username, email, password } = data;

    const ajaxCfg = {
      method: 'POST',
      url: URL,
      data: {
        username,
        email,
        password
      }
    };

    return ajax(ajaxCfg)
      .then(resp => parser.parseSuccessResponse(resp.data))
      .catch(resp => Promise.reject(parser.parseErrorResponse(resp.data)));
  };
}
