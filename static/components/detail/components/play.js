import React from 'react';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import style from './index.styl';

const playBtn = require('../assets/playBtn.png');
let enhanced = compose(
  withHandlers({
    jump: props => (ev) => {
      setTimeout(() => {
        location.href = props.playUrl;
      }, 10);
    }
  })
);

const play = ({playUrl, jump}) => {
  return (
    <div className={style.play}>
      <div className={style.tip}>播放源</div>
      <a href={playUrl} className={style.btn} onTouchStart={jump}>
        <img src={playBtn} />
        <div className={style.shadow} />
      </a>
    </div>
  );
};

export default enhanced(play);
