const allowedCors = [
  'https://api.mestechko.nomoredomains.rocks/',
  'https://mestechko.nomoredomains.rocks',
  'http://mestechko.nomoredomains.rocks',
  'http://localhost:3000',
];

function checkSource(req, res, next) {
  const { method } = req;
  const { origin } = req.headers;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requetsHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requetsHeaders);
    return res.end();
  }
  return next();
}

module.exports = {
  checkSource,
};
