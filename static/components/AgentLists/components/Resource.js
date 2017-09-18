import React from 'react';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import style from './index.styl';

const enhance = compose(
  withHandlers({
    removeSource: props => (event) => {
      let result = confirm('are you sure to remove this resource?');
      if (confirm) {
        let {id, agentId, delResource} = props;
        delResource({
          agentId,
          resourcId: id
        });
      }
    }
  })
);

const Resource = ({name, id, addResource, removeSource}) => {
  return (
    <span className={style.resource}>
      <span>{name}</span>
      <button
        href=""
        data-id={id}
        onClick={removeSource}
      >
        <span>X</span>
      </button>
    </span>
  );
};

export default enhance(Resource);
