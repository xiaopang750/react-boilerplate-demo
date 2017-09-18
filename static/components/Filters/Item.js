import React from 'react';
import classnames from 'classnames';
import style from './index.styl';

const Item = ({name, id, isActive}) => {
  let itemClass = classnames({
    [style.item]: true,
    active: isActive === 'true'
  });
  return (
    <span data-id={id} className={itemClass}>{name}</span>
  );
};

export default Item;
