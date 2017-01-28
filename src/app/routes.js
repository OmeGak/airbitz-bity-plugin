import Shell from './shell';
import protectedRoute from './auth/protected-route';
import onlyGuestRoute from './auth/only-guest-route';
import LoginPage from './auth/login-page';
import SignupPage from './auth/signup-page';
import OrdersHistoryPage from './orders/orders-history-page';
import CreateOrderPage from './orders/create-order-page';
import AccountInfoPage from './account/account-info-page';

export default {
  path: '/',
  component: Shell,
  indexRoute: {
    onEnter: (nextState, replace) => replace('/orders')
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
      path: 'orders/new',
      component: protectedRoute(CreateOrderPage)
    },
    {
      path: 'account',
      component: protectedRoute(AccountInfoPage)
    }
  ]
};
