import React from 'react';
import style from './index.styl';

const Summary = ({data: {summary: {building, idle}}}) => {
  return (
    <div className={style.summary}>
      <h2>Summary</h2>
      <div>
        <p>building: {building}</p>
        <p>idle: {idle}</p>
      </div>
    </div>
  );
};

export default Summary;
