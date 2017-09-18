import React from 'react';
import Tablists from './Tablists';
import style from './index.styl';

const Tabs = ({data, nowDashBordId}) => {
  return (
    <div className={`${style.tabLists} clearfix`}>
      <Tablists
        tabLists={data}
        nowDashBordId={nowDashBordId}
      />
    </div>
  );
};

export default Tabs;
