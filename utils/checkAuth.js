import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decodedToken = jwt.verify(token, 'userToken');
      req.userId = decodedToken._id;
      next();
    } catch (error) {
      return res.status(403).json({
        message: 'No access'
      });
    }
  } else {
    return res.status(403).json({ message: 'No access' });
  }

  next();
};