import Shell from './shell';
import protectedRoute from './auth/protected-route';
import onlyGuestRoute from './auth/only-guest-route';
import LoginPage from './auth/login-page';
import SignupPage from './auth/signup-page';
import OrdersHistoryPage from './orders/orders-history-page';
import AccountInfoPage from './account/account-info-page';

import ConvertPage from './orders/convert-page';
import SuccessfulConvertPage from './orders/successful-convert-page';
import { QuotaExceededPage } from './quota';
import { Page as PhoneNotVerifiedPage } from './phone/phone-not-verified-page';
import OrderDetailsPage from './orders/order-details-page';

export default {
  path: '/',
  component: Shell,
  indexRoute: {
    onEnter: (nextState, replace) => replace('/convert')
  },
  childRoutes: [
    {
      path: 'login',
      component: onlyGuestRoute(LoginPage)
    },
    {
      path: 'signup',
      component: onlyGuestRoute(SignupPage)
    },
    {
      path: 'orders',
      component: protectedRoute(OrdersHistoryPage)
    },
    {
      path: 'orders/:id',
      component: protectedRoute(OrderDetailsPage)
    },
    {
      path: 'convert',
      component: protectedRoute(ConvertPage)
    },
    {
      path: 'convert/success',
      component: protectedRoute(SuccessfulConvertPage)
    },
    {
      path: 'account',
      component: protectedRoute(AccountInfoPage)
    },
    {
      path: '/quota/exceeded',
      component: protectedRoute(QuotaExceededPage)
    },
    {
      path: '/phone/not-verified',
      component: protectedRoute(PhoneNotVerifiedPage)
    }
  ]
};
