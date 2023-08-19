import jwt from 'jsonwebtoken';

const SECRET_KEY = 'secret-key';

const auth = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }

  jwt.verify(token, SECRET_KEY, (error, decodedToken) => {
    if (error) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.userId = decodedToken.userId;
    next();
  });
};

export default auth
