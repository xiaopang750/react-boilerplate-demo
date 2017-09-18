import path from 'path';

let modelDir = path.resolve(__dirname, '../model');

const controllers = (name, query) => {
  let data = require(`${modelDir}/${name}`)(query);
  return data;
};

export default controllers;
