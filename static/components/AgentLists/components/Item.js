import React from 'react';
import classnames from 'classnames';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import Resource from './Resource';
import Info from './Info';
import Deny from '../../Deny';
import style from './index.styl';

const enhance = compose(
  withHandlers({
    addAgentSource: props => (event) => {
      let name = prompt('请输入资源名称', 'Test');
      let {id} = props;
      props.addResource({
        agentId: id,
        name
      });
    }
  })
);

const Item = ({index, name, id, host, status, deny, root, resources, addAgentSource, delResource}) => {
  let itemClass = classnames({
    [style.item]: true,
    [style.active]: deny === true
  });
  return (
    <li className={itemClass}>
      <dl className="clearfix">
        <dt>{index}</dt>
        <dd>
          <Info name={name} host={host} status={status} root={root} />
          <div>
            <button onClick={addAgentSource}>+ Special resources</button>
            <span>|</span>
            <span>Resources:</span>
            <span>
              {
                resources.map((item) => {
                  let {name: sourceName, id: sourceId} = item;
                  return (
                    <Resource
                      name={sourceName}
                      agentId={id}
                      id={sourceId}
                      key={sourceId}
                      delResource={delResource}
                    />
                  );
                })
              }
            </span>
          </div>
        </dd>
      </dl>
      <Deny isShow={deny === false} />
    </li>
  );
};

export default enhance(Item);
