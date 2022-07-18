const express = require('express');
const Joi = require('joi');
const router = express.Router();

const courses = [
    {id: 1, name: 'course 1'},
    {id: 2, name: 'course 2'},
    {id: 3, name: 'course 3'},
];

router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) //404
        res.status(404).send('COURSE WITH GIVEN ID NOT FOUND');
    else
        res.send(course);
});

router.post('/', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const result = schema.validate(req.body);

    if (result.error){
        res.status(400).send(result.error);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course){ //404
        res.status(404).send('COURSE WITH GIVEN ID NOT FOUND');
        return;
    }
    
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const result = schema.validate(req.body);

    if (result.error){
        res.status(400).send(result.error);
        return;
    }
    
    course.name = req.body.name;
    res.send(course);
});

router.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course){ //404
        res.status(404).send('COURSE WITH GIVEN ID NOT FOUND');
        return;
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

module.exports = router;