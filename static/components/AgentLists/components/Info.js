import React from 'react';
import style from './index.styl';

const Info = ({name, host, status, root}) => {
  return (
    <div className={style.info}>
      <span>{name}</span>
      <span>|</span>
      <span>{status}</span>
      <span>|</span>
      <span>{host}</span>
      <span>|</span>
      <span>{root}</span>
    </div>
  );
};

export default Info;
