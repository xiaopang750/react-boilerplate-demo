import React from 'react';
import Tab from './Tab';

const Tablists = ({tabLists, nowDashBordId}) => {
  return (
    <ul>
      {
        tabLists.map((item) => {
          let {id, name} = item;
          let isAcitve = nowDashBordId === id;
          return (
            <Tab
              id={id}
              name={name}
              key={id}
              isAcitve={isAcitve}
            />
          );
        })
      }
    </ul>
  );
};

export default Tablists;
