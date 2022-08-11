'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('command-palette')
      .service('myService')
      .getWelcomeMessage();
  },
};
