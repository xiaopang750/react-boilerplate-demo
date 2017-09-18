import React from 'react';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import mapProps from 'recompose/mapProps';
import lifecycle from 'recompose/lifecycle';
import {bindActionCreators} from 'redux';
import detail from '../../components/detail';

const {
  component: Detail,
  actions: {getVideoDetail, clearDetail},
  selector: DetailSelector,
  constants: {NAME, GET_DETAIL_API}
} = detail;

const mapDispatchToProps = dispatch => ({
  getVideoDetail: bindActionCreators(getVideoDetail, dispatch),
  clearDetail: bindActionCreators(clearDetail, dispatch)
});

let enhanced = compose(
  connect(state => state, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      let {match: {params: {id}}} = this.props;
      this.props.getVideoDetail({
        url: `${GET_DETAIL_API}${id}`
      });
    }
  }),
  mapProps(DetailSelector)
);

const DetailContainer = (props) => {
  let {getVideoDetail: getData, clearDetail: clearData, history} = props;
  return (
    <div>
      <Detail
        {...props[NAME]}
        getData={getData}
        clearData={clearData}
      />
    </div>
  );
};

export default enhanced(DetailContainer);
