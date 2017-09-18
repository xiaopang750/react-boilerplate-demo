module.exports = (query) => {
  // use query find in mongodb db.find(query);
  console.log(query);
  return {
    data: [
      {
        id: 'd1',
        name: 'DASHBORD',
        filters: [
          {
            id: 'f1',
            name: 'Physical',
          },
          {
            id: 'f1',
            name: 'virtual',
          }
        ]
      },
      {
        id: 'd2',
        name: 'MY CRUISE',
        filters: [
          {
            id: 'f1',
            name: 'Physical',
          },
          {
            id: 'f2',
            name: 'Virtual',
          }
        ]
      },
      {
        id: 'd3',
        name: 'AGENTS',
        filters: [
          {
            id: 'f1',
            name: 'Physical',
          },
          {
            id: 'f2',
            name: 'Virtual',
          }
        ]
      },
      {
        id: 'd4',
        name: 'HELP',
        filters: [
          {
            id: 'f1',
            name: 'Physical',
          },
          {
            id: 'f2',
            name: 'Virtual',
          }
        ]
      },
    ]
  };
};
