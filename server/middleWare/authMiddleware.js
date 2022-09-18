const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next ()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message:" your not auth"})
        }
        const decoded = jwt.verify(token, 'qwerty333')
        req.user = decoded
        next()
    } catch(e) {
        res.status(401).json({message:" your not auth"})
    }
}