var register = function (plugin, options, next) {
  plugin.route({
    method: 'GET',
    path: '/photo',
    handler: function(request, reply) {
      reply('Hello, World!');
    }
  });

  plugin.route({
    method: 'POST',
    path: '/photo',
    handler: function(request, reply) {
      reply('Hello, World!');
    }
  });

  next();
};


register.attributes = {
	name : 'photoApi',
	version : '1.0.0'
}

module.exports = register;
