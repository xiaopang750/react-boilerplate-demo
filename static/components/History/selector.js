import _ from 'lodash';
import {NAME} from './constants';

const selector = (props) => {
  let data = {...props[NAME]};
  data.data = data.data || [];
  return {
    ...props,
    [NAME]: data
  };
};

export default selector;
