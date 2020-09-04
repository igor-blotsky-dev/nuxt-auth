module.exports.getAll = (req, res, next) => { res.json({ message: 'get all success', user: req.user }) }

module.exports.getUserProfile = (req, res, next) => { res.json({ message: 'get user profile success' }) }