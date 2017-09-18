let plugin = require('webpack-isomorphic-tools/plugin');

module.exports = {
  assets: {
    images: {
      extensions: ['png', 'jpg', 'gif', 'ico', 'svg']
    },
    styles: {
      extensions: ['styl'],
      // which `module`s to parse CSS from:
      filter: (module, regularExpression, options, log) => {
        if (options.development) {
          // In development mode there's Webpack "style-loader",
          // which outputs `module`s with `module.name == asset_path`,
          // but those `module`s do not contain CSS text.
          //
          // The `module`s containing CSS text are
          // the ones loaded with Webpack "css-loader".
          // (which have kinda weird `module.name`)
          //
          // Therefore using a non-default `filter` function here.
          //
          return plugin.style_loader_filter(module, regularExpression, options, log);
        }
        return null;

        // In production mode there will be no CSS text at all
        // because all styles will be extracted by Webpack Extract Text Plugin
        // into a .css file (as per Webpack configuration).
        //
        // Therefore in production mode `filter` function always returns non-`true`.
      },

      // How to correctly transform kinda weird `module.name`
      // of the `module` created by Webpack "css-loader"
      // into the correct asset path:
      path: plugin.style_loader_path_extractor,

      // How to extract these Webpack `module`s' javascript `source` code.
      // basically takes `module.source` and modifies `module.exports` a little.
      parser: plugin.css_loader_parser
    }
  }
};
