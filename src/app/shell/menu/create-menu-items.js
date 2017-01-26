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
      <Link to="/login" title="Login" replace />
    </MenuItem>,
    <MenuItem onClick={onMenuItemClick} key="2">
      <Link to="/signup" title="Register" replace />
    </MenuItem>
  ];
}

function createKnownUserMenuItems(onMenuItemClick) {
  return [
    <MenuItem onClick={onMenuItemClick} key="1">
      <Link to="/orders" title="History" />
    </MenuItem>,
    <MenuItem onClick={onMenuItemClick} key="2">
      <Link to="/orders/new" title="Buy / Sell" />
    </MenuItem>,
    <MenuItem onClick={onMenuItemClick} key="3">
      <Link to="/account" title="My Info" />
    </MenuItem>,
    <MenuItem onClick={onMenuItemClick} key="4">
      <LogoutButton />
    </MenuItem>
  ];
}
