exports.command = function(address, callback) {
  const self = this;
  const mandrill = this.globals.mandrill;
  const requestbin = this.globals.requestbin;
  const mandrillRoutes = this.globals.mandrillRoutes || [];
  callback = callback || function() {};
  const route = mandrillRoutes.filter(function(route) {
    return route.address === address;
  })[0];
  if(!route) {
    callback([]);
    return;
  }
  const maxRetries = 20;
  var retry = 0;
  function fetchFormData(callback) {
    retry += 1;
    if (retry === maxRetries) {
      callback(null, []);
      return;
    }
    self.pause(5000).perform(function(done) {
      requestbin.requests(route.binName, function(err, results) {
        if (err) {
          callback(err, null);
          done(err);
          return;
        }
        results = results.map(function(r) {
          try {
            return JSON.parse(((r.form_data || {}).mandrill_events || [])[0] || 'null')
              .filter(function(obj) {
                return obj.event === 'inbound' && obj.msg;
              })
              .map(function(obj) {
                return obj.msg;
              });
          } catch(e) {}
          return null;
        })
        .filter(function(data) { return data && typeof data === 'object'; });
        results = results.concat.apply([], results);
        if (results && results.length > 0) {
          callback(null, results);
        } else {
          fetchFormData(callback);
        }
        done(null);
      });
    });
  }
  fetchFormData(function(err, results) {
    callback(results || []);
  });
  return this;
}
