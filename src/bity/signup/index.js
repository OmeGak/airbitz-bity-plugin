import signup2RequestFactory from './signup-2';

export default function signupApiFactory(ajax) {
  return {
    signup2: signup2RequestFactory(ajax)
  };
}
