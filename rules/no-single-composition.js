'use strict';

const _ = require('lodash/fp');
const enhance = require('./core/enhance');

const create = function (context) {
  const info = enhance();

  return info.merge({
    CallExpression: function (node) {
      if (node.arguments.length > 1 || _.get([0, 'type'], node.arguments) === 'SpreadElement') {
        return;
      }
      const method = info.helpers.isComposeMethod(node);
      if (method) {
        context.report(node, `\`${method.name}\` should have at least two arguments`);
      }
    }
  });
};

module.exports = {
  create,
  meta: {
    docs: {
      description: 'Enforce at least two methods arguments for composition methods.',
      recommended: 'error'
    }
  }
};
