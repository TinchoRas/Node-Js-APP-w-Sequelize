const express = require('express');
const { append } = require('express/lib/response');
const router  = express.Router();
const db = require('../config/database');
const Gig = require('../modules/Gig');
const Sequelize = require('sequelize')
const Op = Sequelize.Op; //This is the "like" operator que te sirve para matchear lo que buscás en el search con lo que hay en objeto de la DB. 
router.get('/', (req, res)=> {
    Gig.findAll()
        .then(gigs => {console.log(gigs)
            res.render('gigs', {
                gigs
            });
        })
        .catch(err => console.log(err));
})

//Display add gig form

router.get('/add', (req, res) => {
    res.render('add')
})


//add a gig
router.post('/add', (req, res)=> {
   
    let {title, technologies, budget, description, contact_email} = req.body;
    let errors = []
    if(!title){
        errors.push({text: 'Please add a title'})
    }
    if(!technologies){
        errors.push({text: 'Please add some technologies'})
    }
    if(!contact_email){
        errors.push({text: 'Please add a contact email'})
    }
    if(!description){
        errors.push({text: 'Please add a description'})
    }
    //insert into table
    if(errors.length > 0) {
        
            res.render('add', {
                title,
                technologies,
                budget,
                description,
                contact_email
            })
        } else { 
            if(!budget){
                budget = 'Unknown'
            }else {
                budget = `$${budget}`
            }
            //Make lowercase            
            technologies = technologies.toLowerCase()
        Gig.create({
           title,
           technologies,
           budget,
           description,
           contact_email
       }) 
       .then(gig =>  res.redirect('/gigs'))
       .catch(err => console.log(err));} 
})

//search for gigs
router.get('/search', (req, res)=> {
    let {term} = req.query
    term = term.toLowerCase()
    Gig.findAll({ where : {technologies: { [Op.like]: '%'+term+'%'}}
    }) 
    .then(gigs => res.render('gigs', {gigs}))
    .catch(err => console.log(err))
})

module.exports = router