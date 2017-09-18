import {NAME} from './constants';

const selector = (props) => {
  let data = {...props[NAME]};
  data.data = data.data || {
    lists: [],
    summary: {}
  };
  return {
    ...props,
    [NAME]: data
  };
};

export default selector;
