import React from 'react';

const Item = ({name, id}) => {
  return (
    <li data-id={id}>{name}</li>
  );
};

export default Item;
