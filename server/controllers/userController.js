const ApiError = require('../error/apiError')
const {User, Basket} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//const { regexp } = require('sequelize/types/lib/operators')

const generateJWT = (id, email, role) => {
     return jwt.sign({id, email, role},
           'qwerty333', 
           {expiresIn:'24h'})
}
 
class UserController {
    async registration (req, res, next) {
        const {email, password, role} = req.body
        console.log(email, password, role)
        if (!email || !password) {
            return next(ApiError.badRequest('uncorrectly email or password'))
        }

        const candidate = await User.findOne({where:{email}})
        console.log(candidate + 'efwe')
        if (candidate) {
            return next(ApiError.badRequest('this user exist'))
        } 

        const hashPassword = await bcrypt.hash(password, 5)
        console.log(hashPassword + 'sdgsdgrg')
        const user = await User.create({email, role, password:hashPassword})
        //console.log(user)
        const basket = await Basket.create({userId:user.id})
        const token = generateJWT(user.id, user.email, user.role)
    
        return res.json({token})

    }

    async login (req, res, next) {
        const {email, password} = req.body
        
        const user = await User.findOne({where:{email}})
        console.log(user)
        if(!user) {
            return next(ApiError.internal('user not found'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('your password is not right'))
        }
        const token = generateJWT(user.id, user.email, user.role)
        return res.json({token})
    }

    async check (req, res, next) {
        // //res.json({message:"asll right"})
        // const token = generateJWT(req.user.id, req.user.email, req.user.role)
        // return res.json({token})
    }
}

module.exports = new UserController()