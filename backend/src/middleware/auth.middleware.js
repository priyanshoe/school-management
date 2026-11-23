const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const authorization = req.get('authorization');
  const bearerToken = authorization && authorization.startsWith('Bearer ')
    ? authorization.slice(7)
    : null;
  const token = (req.cookies && req.cookies.token) || bearerToken;

  if (!token) return res.status(401).json({ message: 'Authentication required' });
  const secret = process.env.JWT_SECRET || process.env.JWT_SECRETE || 'SECRET';

  try {
    req.user = jwt.verify(token, secret);
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired authentication token' });
  }
}

function authorize(roles = []) {
  if (typeof roles === 'string') {
    roles = [roles];
  }
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    const userRole = (req.user.role || '').toLowerCase();
    const normalizedRoles = roles.map(r => r.toLowerCase());
    if (normalizedRoles.length > 0 && !normalizedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
    return next();
  };
}

module.exports = { authenticate, authorize };
