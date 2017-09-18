module.exports = (query) => {
  // use query find in mongodb db.find(query);
  console.log(query);
  return {
    data: {
      summary: {
        building: 2,
        idle: 2
      },
      lists: [
        {
          id: 'l1',
          name: 'bjstdmngbgr02.thoughtworks.com',
          status: 'idle',
          host: '192.168.1.1',
          deny: false,
          root: '/var/lib/cruise-agent',
          resources: [
            {
              id: 'r1',
              name: 'ubuntu'
            },
            {
              id: 'r2',
              name: 'firefox'
            },
            {
              id: 'r3',
              name: 'core-duo'
            }
          ]
        },
        {
          id: 'l2',
          name: 'bjstdmngbgr02.thoughtworks.com',
          status: 'idle',
          host: '192.168.1.2',
          deny: true,
          root: '/var/lib/cruise-agent',
          resources: [
            {
              id: 'r1',
              name: 'ubuntu'
            },
            {
              id: 'r2',
              name: 'firefox'
            },
            {
              id: 'r3',
              name: 'core-duo'
            }
          ]
        },
        {
          id: 'l3',
          name: 'bjstdmngbgr02.thoughtworks.com',
          status: 'idle',
          host: '192.168.1.3',
          deny: true,
          root: '/var/lib/cruise-agent',
          resources: [
            {
              id: 'r1',
              name: 'ubuntu'
            },
            {
              id: 'r2',
              name: 'firefox'
            },
            {
              id: 'r3',
              name: 'core-duo'
            }
          ]
        },
        {
          id: 'l4',
          name: 'bjstdmngbgr02.thoughtworks.com',
          status: 'idle',
          host: '192.168.1.4',
          deny: true,
          root: '/var/lib/cruise-agent',
          resources: [
            {
              id: 'r1',
              name: 'ubuntu'
            },
            {
              id: 'r2',
              name: 'firefox'
            },
            {
              id: 'r3',
              name: 'core-duo'
            }
          ]
        },
      ]
    }
  };
};
