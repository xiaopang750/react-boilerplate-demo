module.exports = (query) => {
  // use query find in mongodb db.find(query);
  console.log(query);
  return {
    data: [
      {
        id: 'h1',
        name: 'bjstdmngbgr02/Acceptance_test01'
      },
      {
        id: 'h2',
        name: 'bjstdmngbgr02/Acceptance_test02'
      },
      {
        id: 'h3',
        name: 'bjstdmngbgr02/Acceptance_test03'
      }
    ]
  };
};
