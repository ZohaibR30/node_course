const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB ', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: Date,
    isPublished: Boolean,
    price: Number
});

const Courses = mongoose.model('Course', courseSchema);

async function getResults(){
    const courses = await Courses   
        .find({isPublished: true})
        .or([{price: {$gte: 15}}, {name: /.*by.*/i}])
        .sort({price: -1})
        .select({name: 1, author: 1, price: 1});
    
    console.log(courses);
}

getResults();
