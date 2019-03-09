const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  var apiProxy = proxy(['/api', '/auth/google'], { target: 'http://localhost:5000' })
  app.use(apiProxy)
  
}
