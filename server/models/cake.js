const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    rating: {type: Number, required: [true, "Must include a number"]},
    comment: {type: String, required: [true, "Why no content?"], minlength: [3, "Comments must be at least 3 characters"]}},
    {timestamps:true}
    );
const CakeSchema = new mongoose.Schema({
    baker: {type: String, required: [true, "Baker must have a name. Please add a name!"], minlength: [2, "Names must have at least 2 characters"]},
    image: {type: String, required: [true, "need a URL!"]},
    ratings: [RatingSchema]
    }, {timestamps: true})


mongoose.model('Rating', RatingSchema); 
mongoose.model('Cake', CakeSchema); 
