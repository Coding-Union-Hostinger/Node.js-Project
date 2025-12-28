// Simple HTTP Basic Auth middleware using env vars ADMIN_USER and ADMIN_PASS
module.exports = function basicAuth(req, res, next) {
  const auth = req.headers.authorization;
  const user = process.env.ADMIN_USER || 'admin';
  const pass = process.env.ADMIN_PASS || 'secret';

  if (!auth) {
    res.set('WWW-Authenticate', 'Basic realm="Admin"');
    return res.status(401).send('Authentication required');
  }

  const [scheme, encoded] = auth.split(' ');
  if (scheme !== 'Basic' || !encoded) {
    return res.status(400).send('Bad auth format');
  }

  const buff = Buffer.from(encoded, 'base64');
  const [u, p] = buff.toString().split(':');

  if (u === user && p === pass) return next();

  res.set('WWW-Authenticate', 'Basic realm="Admin"');
  return res.status(401).send('Invalid credentials');
};