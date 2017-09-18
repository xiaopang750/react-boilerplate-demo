import React from 'react';
import classnames from 'classnames';
import style from './index.styl';

const Deny = ({isShow}) => {
  let denyClass = classnames({
    [style.deny]: true,
    [style.none]: !isShow
  });
  return (
    <div className={denyClass}>
      <button>Deny</button>
    </div>
  );
};

export default Deny;
