const jwt = require('jsonwebtoken')

const verifyToken = async(req, res, next) => {
    try {
        let token = req.headers['authorization'];
        if (!token) {
          return res.status(404).send({ message: 'Tidak ada token yang disediakan.' });
        }
     const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
      req.userId = decoded.id;
      req.userRole = decoded.role;
      next();
    } catch (err) {
      console.error(err);
      res.status(500).send({ auth: false, message: 'Gagal melakukan verifikasi token.' });
    }
  }

const isAdmin = async (req, res, next) => {
  try {
      if (req.userRole !== 'admin') {
          return res.status(403).json({ message: 'Anda tidak memiliki izin untuk mengakses.' });
      }
      next();
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Terjadi kesalahan saat memeriksa peran pengguna.' });
  }
};

const isUser = async (req, res, next) => {
  try {
      if (req.userRole !== 'users') {
          return res.status(403).json({ message: 'Anda tidak memiliki izin untuk mengakses.' });
      }
      next();
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Terjadi kesalahan saat memeriksa peran pengguna.' });
  }
};




  module.exports = {
    verifyToken,
    isAdmin,
    isUser
  }