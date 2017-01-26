import React from 'react';
import MenuItem from './menu-item';

const guestMenuItems = [
  {
    href: '/login',
    title: 'Login'
  },
  {
    href: '/signup',
    title: 'Register'
  }
];

const loggedInItems = [
  {
    href: '/orders',
    title: 'Orders'
  },
  {
    href: '/orders/new',
    title: 'Buy / Sell'
  },
  {
    href: '/account',
    title: 'User Info'
  }
];

export default function createMenuItems({ onClick, isAuthenticated }) {
  /* eslint-disable react/no-array-index-key */
  const items = isAuthenticated ? loggedInItems : guestMenuItems;
  return items.map((obj, index) => (
    <MenuItem key={index} href={obj.href} title={obj.title} onClick={onClick} />
  ));
}
