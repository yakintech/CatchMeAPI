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
    birthday: {
        type: Date,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    profilePicture: {
        type: String
    }
},
{
    timestamps: true,
});


const User = mongoose.model('User', UserSchema);

module.exports = {
    User
}
