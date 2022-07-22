const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB ', err));

const courseSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 5, maxlength: 25},

    category: { 
        type: String, 
        required: true, 
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        trim: true
    },

    author: String,

    tags: {
        type: Array,
        validate: {
            validator: function(value){
                return value && value.length > 0;
            },
            message: 'A course should have atleast one tag.'
        }
    },

    date:{type: Date, default: Date.now},

    isPublished: Boolean,

    price: {
        type: Number,
        required: function (){
            return this.isPublished;
        },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

const Course = mongoose.model('Course', courseSchema); //collection, schema

async function createCourse(){

    const course = new Course({
        name: 'Course Test',
        category: 'web',
        author: 'Zohaib',
        tags: ['angular', 'frontend'],
        isPublished: true,
        price: 15.8
    });

    try{
        const result = await course.save();
        console.log(result);
    }

    catch (exception){
        for (field in exception.errors)
            console.log(exception.errors[field].message);
    }
    
}

async function getCourses(){
    // COMPARISION OPERATORS

    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)

    // LOGICAL OPERATORS
    
    // or
    // and

    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
    
        // .find({price: { $gte: 10, $lte: 20 }})
        // .find({price: { $in: [10, 15, 20]}})
        
        // .find()
        // .or([{author: 'Zohaib'}, {isPublished: true}])    
        // .and([{author: 'Zohaib'}, {isPublished: true}])    
        
        // .find({author: /^Mosh/})
        // .find({author: /Hamedani$/i})
        // .find({author: /.*Mosh.*/})

        .find({author:'Zohaib', isPublished: true})
        // .skip((pageNumber - 1) * pageSize)
        // .limit(pageSize)
        .limit(10)
        .sort({ name: 1 }) //ASC: 1, DESC: -1
        .select({name: 1, tags: 1});
        
        // .count();
    console.log(courses);
}

async function updateCourse(id){
    const course = await Course.findById(id);

    if (!course)
        return;
    
    course.isPublished = true;
    course.author = 'Another Author';

    const result = await course.save();
    console.log(result);
}

async function directUpdate(id){
    // const result = await Course.update({_id: id}, {
    //     $set: {
    //         author: 'Mosh',
    //         isPublished: false
    //     }
    // });

    // console.log(result);

    // findByIdAndUpdate to return the original document
    // to return the updated document, pass an argument {new: true}

    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Mosh',
            isPublished: false
        }
    }, {new: true});

    console.log(course);
}

async function removeCourse(id){
    // const course = await Course.findByIdAndRemove(id); //TO RETURN DELETED OBJECT
    const result = await Course.deleteOne({_id: id});
    console.log(result);
}
createCourse();
// getCourses();
// updateCourse('62d68cc8f8ae746daa37226c');
// directUpdate('62d68cc8f8ae746daa37226c');
// removeCourse('62d68cc8f8ae746daa37226c'); 