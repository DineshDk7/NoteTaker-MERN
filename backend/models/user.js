const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    age : {
        type : Number,
        validate(value){ //Validation of the input can be done
            if(value < 0){
                throw new Error('Age should be positive integer') 
            }
        }
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true,
        trim : true
    },
    resetPasswordToken : {
        type : String,
    },
    tokens : [{
            token : {
                type : String,
                required : true
            }
    }],
    pic : {
        type : String,
        default : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    }
},{
    timestamps : true
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({ _id : user._id.toString() }, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    return token
}

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    // delete userObject.password
    delete userObject.tokens

    //const userObject = { name : user.name, email : user.email, password : user.password, pic : user.pic}
    //Better than the above way, because even by mistake no sensitive info is leaked

    return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if(!user){
        throw new Error('Invalid Login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Invalid Login')
    }
    return user
}

userSchema.statics.findUserForReset = async (email) => {
    const user = await User.findOne({ email })
    if(user) {
        const token = jwt.sign({ _id : user._id.toString() }, process.env.JWT_SECRET ,{ expiresIn: '1h' })
        user.resetPasswordToken = token
        await user.save()
        //res.status(200).send({ user, token })
        return user
    }else{
        return new Error('Not a registered User')
    }
}


//UserSchema is the middleware which can be performed before or after certain operations we mention. Here, we have used for 'save' function
//Used to hash the password
userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()//Used as an exit criteria
})

//Delete the tasks of the user when that user is removed 
userSchema.pre('remove', async function(next){
    try{
        const user = this
        await Task.deleteMany({ owner : user._id })
        next()
    }catch(err){
        throw new Error('Error in remove all tasks')
        next()
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User