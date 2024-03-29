const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: [authorSchema] 
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId){
  // const course = await Course.findById(courseId);
  // course.author.name = 'Zohaib';
  // course.save();

  //IN THE BELOW CODE SEGMENT, USE (unset) TO REMOVE PROPERTIES
  const course = await Course.updateOne({ _id: courseId}, {
    $set : {
      'author.name': 'John'
    }
  });
}

createCourse('Node Course', [
  new Author({ name: 'Mosh' }),
  new Author({ name: 'Zohaib' })
]);

// updateAuthor('62dc0d241086b18113b91f33');