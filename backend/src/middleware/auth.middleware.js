const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const authorization = req.get('authorization');
  const bearerToken = authorization && authorization.startsWith('Bearer ')
    ? authorization.slice(7)
    : null;
  const token = req.cookies.token || bearerToken;

  if (!token) return res.status(401).json({ message: 'Authentication required' });
  if (!process.env.JWT_SECRETE) {
    return res.status(500).json({ message: 'JWT_SECRETE is not configured' });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRETE);
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired authentication token' });
  }
}

module.exports = { authenticate };
