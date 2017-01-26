import Shell from './shell';
import LoginPage from './auth/login-page';
import SignupPage from './auth/signup-page';
import OrdersHistoryPage from './orders/orders-history-page';
import CreateOrderPage from './orders/create-order-page';
import DetailsPage from './misc/details-page';

export default {
  path: '/',
  component: Shell,
  childRoutes: [
    {
      path: 'login',
      component: LoginPage
    },
    {
      path: 'signup',
      component: SignupPage
    },
    {
      path: 'orders',
      component: OrdersHistoryPage
    },
    {
      path: 'orders/new',
      component: CreateOrderPage
    },
    {
      path: 'account',
      component: DetailsPage
    }
  ]
};
