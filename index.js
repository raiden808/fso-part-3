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
 * Display data requested date
 */
app.get('/info',(req,res)=>{

    let currDate = new Date().toString()

    let infoOutput = "<p>Phonebook has info for "+persons.length+" people</p>";
    infoOutput += "<p>"+currDate+"</p>";

    res.send(infoOutput)
});

/**
 * Retrieve specific person mongodb
 */
app.get('/api/persons/:id',(request,response)=>{
    Person.findById(request.params.id).then(person =>{
        response.json(person.toJSON())
    })
})

/**
 * Person delete function
 */
app.delete('/api/persons/:id',(request,response)=>{
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
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
 * Port assigned to web app
 * Very important when working with heroku
 */
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})