const express = require('express')
const app = express()
const bodyParser = require('body-parser')

let persons = [
    {
        id:6,
        name: "Jamal Newman",
        phone: "312-3123"
    },
    {
        id: 7,
        name: "Danny Hartow",
        phone: "023-1232"
    },
    {
        id: 10,
        name: "Donny Ganger",
        phone: "0123-1221"
    }
];

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
 * Post Request
 */
app.use(bodyParser.json())

app.post('/api/persons',(request,response) => {
    const body = request.body

    // if(!body.content){
    //     return response.status(400).json({
    //         error:'content missing'
    //     })
    // }


    console.log(body.test)

    response.send("done")
})

/**
 * Port where server is enabled
 */
const PORT = 3001
app.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`)
});