import React from 'react';
import {bindActionCreators} from 'redux';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import mapProps from 'recompose/mapProps';
import {connect} from 'react-redux';
import style from './index.styl';
import Header from '../../components/Header';
import Title from '../../components/Title';
import Tabs from '../../components/Tabs';
import Filters from '../../components/Filters';
import AgentLists from '../../components/AgentLists';
import Summary from '../../components/Summary';
import History from '../../components/History';
import Footer from '../../components/Footer';

const {
  component: Bords,
  actions: getBords,
  selector: bordsSelector,
  constants: {NAME: BordsData, GET_DATA_API: GET_BORDS_API}
} = Tabs;

const {
  component: AgentArea,
  actions: {
    getData: getAgentLists,
    addResource,
    delResource
  },
  selector: agentListsSelector,
  constants: {NAME: AgentListsData, GET_DATA_API: GET_AGENTLISTS_API}
} = AgentLists;

const {
  component: HistoryArea,
  actions: getHistory,
  selector: historySelector,
  constants: {NAME: HistoryData, GET_DATA_API: GET_HISTORY_API}
} = History;

const mapDispatchToProps = dispatch => ({
  getBords: bindActionCreators(getBords, dispatch),
  getAgentLists: bindActionCreators(getAgentLists, dispatch),
  getHistory: bindActionCreators(getHistory, dispatch),
  addResource: bindActionCreators(addResource, dispatch),
  delResource: bindActionCreators(delResource, dispatch),
});

let enhanced = compose(
  connect(state => state, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.getBords({
        url: GET_BORDS_API,
        qs: {
          id: 'd3'
        }
      });
      this.props.getAgentLists({
        url: GET_AGENTLISTS_API,
        qs: {
          type: ''
        }
      });
      this.props.getHistory({
        url: GET_HISTORY_API,
        qs: {
          type: ''
        }
      });
    }
  }),
  mapProps(bordsSelector),
  mapProps(agentListsSelector),
  mapProps(historySelector)
);

const IndexContainer = (props) => {
  return (
    <div>
      <Header />
      <div className="clearfix">
        <Title title="Cruise" />
        <Bords {...props[BordsData]} />
      </div>
      <div className="main">
        <div className={style.top}>
          <Filters
            {...props[BordsData]}
            nowDashBordId={props[BordsData].nowDashBordId}
          />
        </div>
        <div className={`${style.bottom} clearfix`}>
          <dl>
            <dt className={style.leftInfo}>
              <AgentArea
                {...props[AgentListsData]}
                addResource={props.addResource}
                delResource={props.delResource}
              />
            </dt>
            <dd className={style.rightInfo}>
              <Summary {...props[AgentListsData]} />
              <HistoryArea {...props[HistoryData]} />
            </dd>
          </dl>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default enhanced(IndexContainer);
