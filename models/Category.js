const { default: mongoose } = require("mongoose");


const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        unique: true,
    }
},
{
    timestamps: true
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = {
    Category
}