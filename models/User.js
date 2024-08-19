const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    confirmCode: {
        type: String,
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    
},
{
    timestamps: true,
});


module.exports = mongoose.model('User', UserSchema);