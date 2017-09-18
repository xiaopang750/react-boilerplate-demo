let postcss = require('postcss');

const SCALE = 75;

const convertQpxToRem = ({value, scale}) =>
  value.replace(/\d+qpx/gi, (number) => {
    number = parseInt(number, 10);
    let result = (number / scale).toFixed(3);
    return `${result}rem`;
  });

const myplugin = (options = {}) => (css) => {
  css.walk((node) => {
    let {value} = node;
    if (/qpx/.test(value)) {
      let newValue = convertQpxToRem({value, scale: SCALE});
      node.value = newValue;
    }
  });
};

module.exports = postcss.plugin('qpx', myplugin);
