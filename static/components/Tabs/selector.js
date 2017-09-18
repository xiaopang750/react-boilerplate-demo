import _ from 'lodash';
import {NAME} from './constants';

const selector = (props) => {
  let {match: {params: {dashbord: nowDashBordId}}} = props;
  let data = {...props[NAME]};
  data.data = data.data || [];
  data.filterData = data.data.filter((item) => {
    let {id} = item;
    return id === nowDashBordId;
  })[0] || {};
  data.nowDashBordId = nowDashBordId;
  return {
    ...props,
    [NAME]: data
  };
};

export default selector;
