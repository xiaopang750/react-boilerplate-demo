const NAME = 'videoLists';
const FETCH_PREFIX = 'VIDEO_LIST';
const GET_LISTS_API = `${pageInfo.apiHost.thor}/api/wishing/personal/card`;

const COMMON = {
  ING: 'FETCH_POSTS',
  SUC: 'FETCH_POSTS_SUCCESS',
  FAIL: 'FETCH_POSTS_FAIL'
};

export {
  FETCH_PREFIX,
  COMMON,
  NAME,
  GET_LISTS_API
};
