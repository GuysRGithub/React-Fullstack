const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const saltRounds = 10
const collectionName = "User"

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 5,
        required: true
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})


UserSchema.pre('save', function(next) {
    const user = this

    if (user.isModified("password")) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err)
    
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err)
    
                user.password = hash

                next()
            })
        })
    } else {
        next()
    }
    
})

UserSchema.methods.comparePassword = function(rawPass, callback) {
    bcrypt.compare(rawPass, this.password, function(err, same) {
        if (err) return callback(err)
        return callback(err, same)
    })
}

UserSchema.methods.generateToken = function(cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secret_key')
    user.token = token
    user.save(function(err, user) {
        if (err) return cb(err)
        cb(null, user)
    })
}

UserSchema.statics.findByToken = function(token, callback) {
    var user = this;
    jwt.verify(token, 'secret_key', function(err, decode) { 
        user.findOne({_id: decode, token: token}, function(err, user) {
            if (err) return callback(err)
            callback(null, user)
        })
     })
}


const User = mongoose.model(collectionName, UserSchema)
export default User