module.exports = function attach(app) {
  app.handleGet('/', 'example.dust', {
    resource: [''],
    processors: {
      sample: function (data) {
        data.cheese = 'cake';
        return data;
      }
    }
  });
}
