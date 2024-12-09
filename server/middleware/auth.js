
const SECRET_KEY = "11111111111111111111111111111111";
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token)
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;
      next();
    } catch (err) {
        console.log(err)
      res.status(401).json({ error: 'Invalid token' });
    }
  };


module.exports = authenticate
  