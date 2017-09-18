import React from 'react';
import classnames from 'classnames';
import style from './index.styl';

const Tab = ({id, name, isAcitve}) => {
  let tabClass = classnames({
    [style.tab]: true,
    active: isAcitve === true
  });
  return (
    <li data-id={id} className={tabClass}>
      <span>{name}</span>
    </li>
  );
};

export default Tab;
