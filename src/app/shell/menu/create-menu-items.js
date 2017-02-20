import React from 'react';
import MenuItem from './menu-items/menu-item';
import Link from './menu-items/link';
import LogoutButton from './menu-items/logout-btn';

export default function createMenuItems(isAuthenticated, onMenuItemClick) {
  return isAuthenticated ?
    createKnownUserMenuItems(onMenuItemClick) : createGuestMenuItems(onMenuItemClick);
}

function createGuestMenuItems(onMenuItemClick) {
  return [
    <MenuItem onClick={onMenuItemClick} key="1">
      <Link to="/login" title="Login" replace className="menu-item--sign-in" />
    </MenuItem>,
    <MenuItem onClick={onMenuItemClick} key="2">
      <Link to="/signup" title="Register" replace className="menu-item--sign-up" />
    </MenuItem>
  ];
}

function createKnownUserMenuItems(onMenuItemClick) {
  return [
    <MenuItem onClick={onMenuItemClick} key="1">
      <Link to="/orders" title="History" className="menu-item--history" />
    </MenuItem>,
    <MenuItem onClick={onMenuItemClick} key="2">
      <Link to="/convert" title="Buy / Sell" className="menu-item--convert" />
    </MenuItem>,
    <MenuItem onClick={onMenuItemClick} key="3">
      <Link to="/account" title="My Info" className="menu-item--account" />
    </MenuItem>,
    <MenuItem onClick={onMenuItemClick} key="4">
      <LogoutButton className="menu-item--sign-out" />
    </MenuItem>
  ];
}
