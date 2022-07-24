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

async function addAuthor(courseId, author){
    const course = await Course.findById(courseId);
    course.author.push(author)
    course.save();
}

async function removeAuthor(courseId, authorId){
    const course = await Course.findById(courseId);
    const author = course.author.id(authorId);
    author.remove();
    course.save();
}

// createCourse('Node Course', [
//   new Author({ name: 'Mosh' }),
//   new Author({ name: 'Zohaib' })
// ]);

// addAuthor('62dc2c0b11353046989bfa71', new Author({name: 'Rasool'}));
removeAuthor('62dc2c0b11353046989bfa71', '62dc2c0b11353046989bfa6f');

// updateAuthor('62dc0d241086b18113b91f33');