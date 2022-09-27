//mongodb://localhost:27017
//6331a410385a786a0e73e301
const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    title: { type: String, required: true},
    content: { type: String, required: true}
})

module.exports = mongoose.model("Posts",postSchema);
