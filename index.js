require('dotenv').config()
const express    = require('express')
const app        = express()
const bodyParser = require('body-parser')
let   morgan     = require('morgan')
const Person     = require('./models/person')


/**
 * Middleware should always be used before requests
 */
app.use(bodyParser.json())

/**
 * modified token response of morgan
 */
morgan.token('person', (request, response) => {
    if(request.method != "GET"){
        return JSON.stringify(request.body)
    }
})

/**
 * Morgan terminal logs
 */
app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :person')
)

/**
 * Gets static build built from a front end react app
 */
app.use(express.static('build'))

/**
 * Mongodb General Object View
 */
app.get('/api/persons',(req,res)=>{
    Person.find({}).then(people =>{
        res.json(people.map(person => person.toJSON()))
    })
});

/**
 * Update specific dom MongoDB
 */
app.put('/api/persons/:id',(request, response, next) => {
    const body = request.body

    const person = {
        name:body.name,
        phone:body.phone
    }

    Person.findByIdAndUpdate(request.params.id, person, {new: true})
        .then(updatedPerson =>{
            response.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
});

/**
 * Display data requested date
 */
app.get('/info',(req,res)=>{

    let currDate = new Date().toString()
    let personCount;

    Person.count({}).then(person =>{
       // console.log("----",person)
        personCount = person;
        let infoOutput = "<p>Phonebook has info for "+personCount+" people</p>";
        infoOutput += "<p>"+currDate+"</p>";
    
        res.send(infoOutput)
    })
});

/**
 * Retrieve specific person mongodb
 * make sure 'next' params is in argument
 */
app.get('/api/persons/:id',(request,response,next)=>{
    Person.findById(request.params.id)
        .then(person =>{
            if(person){
                response.json(note.toJSON())
            }
            else{
                response.status(204).end()
            }
        })
        /**
         * pass error to middle ware
         */
        .catch(error => next(error))
})

/**
 * Person delete function
 */
app.delete('/api/persons/:id',(request,response, next)=>{
    Person.findByIdAndDelete(request.params.id)
        .then(result =>{
            response.status(204).end()
        })
        .catch(error => next(error))
});

/**
 * Generate incrementing id
 */
const generateId = () =>{
    const maxId = Math.floor(Math.random() * Math.floor(10000))
    return maxId
}

/**
 * Post Request
 */
app.post('/api/persons',(request,response) => {
    const body = request.body

    if(!body.name){
        return response.status(400).json({
            error:'Name missing.'
        })
    }

    if(!body.phone){
        return response.status(400).json({
            error:'Number missing.'
        })
    }

    /**
     * Create person data
     */
    const person = new Person({
        name:body.name,
        phone:body.phone,
    })

    /**
     * Save to MongoDB
     */
    person.save().then(savedPerson =>{
        response.json(savedPerson.toJSON())
    })
})

/**
 * Unkown endpoint handler
 */
const unknownEndpoint = (request, response) =>{
    response.status(404).send({error:'unknown endpoint'})
}
app.use(unknownEndpoint)

/**
 * Error handling middleware
 */
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
    next(error)
}
app.use(errorHandler)

/**
 * Port assigned to web app
 * Very important when working with heroku
 */
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})