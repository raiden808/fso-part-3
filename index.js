const express = require('express')
const app = express()
const bodyParser = require('body-parser')
let morgan = require('morgan')


/**
 * Middleware should always be used before requests
 */
app.use(bodyParser.json())

/**
 * modified token response of morgan
 */
morgan.token('person', (request, response) => {

    //console.log(request.method)
    if(request.method != "GET"){
        return JSON.stringify(request.body)
    }
})

app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :person')
)

let persons = [
    {
        id:1,
        name: "Jamal Newman",
        phone: "312-3123"
    },
    {
        id: 2,
        name: "Danny Hartow",
        phone: "023-1232"
    },
    {
        id: 3,
        name: "Donny Ganger",
        phone: "0123-1221"
    }
];

/**
 * Gets static build built from a front end react app
 */
app.use(express.static('build'))


/**
 * General view of persons
 */
app.get('/api/persons',(req,res)=>{
    res.json(persons)
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
 * Retrieve specific person
 */
app.get('/api/persons/:id',(request,response)=>{
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person){
        response.json(person)
    } else {
        response.status(404).end()
    }
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

    const nameCheck = persons.find(
        person => person.name === body.name
    )

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

    if(nameCheck){
        return response.status(400).json({
            error:'name must be unique.'
        })
    }

    const person = {
        id:generateId(),
        name:body.name,
        phone:body.phone
    }

    persons = persons.concat(person)

    response.json(persons)
})


/**
 * Port assigned to web app
 * Very important when working with heroku
 */
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})