import React from 'react';
import Item from './Item';
import style from './index.styl';

const Itemlists = ({filterData}) => {
  let {name: bordName, filters = []} = filterData;
  return (
    <div className="filter">
      <span className={style.bordName}>{bordName}</span>
      <Item name="All" isActive="true" />
      {
        filters.map((item) => {
          let {name, id} = item;
          return (
            <Item
              name={name}
              id={id}
              key={id}
              isActive="false"
            />
          );
        })
      }
    </div>
  );
};

export default Itemlists;
