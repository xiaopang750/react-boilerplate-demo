import React from 'react';
import Item from './Item';
import style from './index.styl';

const History = ({data}) => {
  return (
    <div className={style.history}>
      <h2>History</h2>
      {
        data.map((item) => {
          let {name, id} = item;
          return (
            <Item
              name={name}
              id={id}
              key={id}
            />
          );
        })
      }
    </div>
  );
};

export default History;
