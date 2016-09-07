exports.command = function(address, callback) {
  const mandrill = this.globals.mandrill;
  const requestbin = this.globals.requestbin;
  const addressComponents = address.split('@');
  const mandrillRoutes = this.globals.mandrillRoutes || [];
  const requestbinHost = this.globals.requestbinHost;
  this.globals.mandrillRoutes = mandrillRoutes;
  callback = callback || function() {};
  const route = mandrillRoutes.filter(function(route) {
    return route.address === address;
  })[0];
  if (route) {
    callback(route);
    return;
  }
  return this.perform(function(done) {
    requestbin.create(false, function(err, bin) {
      if (err) {
        throw err;
      }
      const binName = bin.name;
      const binURL = requestbinHost + '/' + binName;
      mandrill.inbound.addRoute({
        pattern: addressComponents[0],
        domain: addressComponents[1],
        url: binURL
      }, function(result) {
        const routeId = result.id;
        const data = {
          id: routeId,
          binURL: binURL,
          binName: binName,
          address: address
        };
        mandrillRoutes.push(data);
        callback(data);
        done();
      }, function(err) {
        callback(null);
        done(err);
      });
    });
  });
  return this;
}
