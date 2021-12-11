const authMiddleware = ({ userModel }) => {
  return async (req, res, next) => {
    const user = await userModel.findOne({ email: req.headers.email });
    if (!user) {
      return res.status(401).json({
        success: false,
        data: null,
        message: 'unauthenticated',
      });
    }
    req.user = user;
    return next();
  };
};

module.exports = authMiddleware;
