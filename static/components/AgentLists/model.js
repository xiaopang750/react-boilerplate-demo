const add = (prevState, action) => {
  let data = {...prevState};
  let {payload: {agentId, name}} = action;
  data.data.lists.forEach((item) => {
    let {id} = item;
    if (id === agentId) {
      let newId = new Date().getTime();
      item.resources.push({
        name,
        id: newId
      });
    }
  });
  return data;
};

const remove = (prevState, action) => {
  let data = {...prevState};
  let {payload: {agentId, resourcId}} = action;
  data.data.lists.forEach((item) => {
    let {id} = item;
    if (id === agentId) {
      let removeIndex;
      item.resources.forEach((itemRecource, index) => {
        let {id: nowResourcId} = itemRecource;
        if (resourcId === nowResourcId) {
          removeIndex = index;
        }
      });
      item.resources.splice(removeIndex, 1);
    }
  });
  return data;
};

export {
  add,
  remove
};
