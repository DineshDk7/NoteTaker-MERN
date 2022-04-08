const jwt = require('jsonwebtoken')
const User = require('../models/user')
const dotenv = require("dotenv");
dotenv.config()

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ '_id' : decoded._id, 'tokens.token' : token })
        
        if(!user){
            throw new Error('User not found')
        }
        req.user = user
        req.token = token
        next()
    }catch(err){
        console.log('Authentication failure')
        res.status(401).send({error : 'Authentication failure!'})
    }
}

module.exports = auth