exports.command = function(callback) {
  const self = this;
  const mandrill = this.globals.mandrill;
  const mandrillRoutes = this.globals.mandrillRoutes || [];
  callback = callback || function() {};
  if(mandrillRoutes.length === 0) {
    callback();
    return;
  }
  function deleteFirstRoute(callback) {
    const route = mandrillRoutes.splice(0, 1)[0];
    if(!route) {
      return callback();
    }
    mandrill.inbound.deleteRoute({ id: route.id }, function(result) {
      deleteFirstRoute(callback);
    }, function(err) {
      deleteFirstRoute(callback);
    });
  }
  self.perform(function(done) {
    deleteFirstRoute(function() {
      callback();
      done();
    });
  })

  return this;
}
