import React from 'react';
import Item from './Item';

const AgentLists = ({data: {lists}, addResource, delResource}) => {
  return (
    <div>
      {
        lists.map((item, index) => {
          let {id} = item;
          return (
            <Item
              {...item}
              key={id}
              addResource={addResource}
              delResource={delResource}
              index={index + 1}
            />
          );
        })
      }
    </div>
  );
};

export default AgentLists;
