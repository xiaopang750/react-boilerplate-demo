import React from 'react';
import style from './index.styl';

const Header = () => {
  return (
    <div className={`${style.header}`}>
      <div className={`${style.inner}`}>
        <span>Signed in </span>
        <a href="">Member</a>
        <span>&nbsp;</span>
        <a href="">Sign out</a>
      </div>
    </div>
  );
};

export default Header;
