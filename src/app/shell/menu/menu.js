import React, { PropTypes } from 'react';
import BurgerMenu from 'react-burger-menu';
import createMenuItems from './menu-items';
import './styles.less';

const SlideMenu = BurgerMenu.slide;

const propTypes = {
  isOpen: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  onStateChange: PropTypes.func.isRequired,
  onMenuItemClick: PropTypes.func.isRequired
};

const defaultProps = {
  isOpen: false,
  isAuthenticated: false
};

export default function Menu({ isOpen, onStateChange, onMenuItemClick, isAuthenticated }) {
  const items = createMenuItems({
    onClick: onMenuItemClick,
    isAuthenticated
  });

  return (
    <SlideMenu
      right
      onStateChange={handleStateChange}
      customBurgerIcon={false}
      customCrossIcon={false}
      isOpen={isOpen}
    >
      {items}
    </SlideMenu>
  );

  function handleStateChange(state) {
    onStateChange(state.isOpen);
  }
}

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;
