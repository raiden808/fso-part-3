const express = require('express')
const app = express()
const bodyParser = require('body-parser')

let persons = [
    {
        "name": "Jamal Newman",
        "phone": "312-3123",
        "id": 6
    },
    {
        "name": "Danny Hartow",
        "phone": "023-1232",
        "id": 7
    },
    {
        "name": "Donny Ganger",
        "phone": "0123-1221",
        "id": 10
    }
];

/**
 * General view of persons
 */
app.get('/api/persons',(req,res)=>{
    res.json(persons)
});

/**
 * 
 */
app.get('/info',(req,res)=>{

    let currDate = new Date().toString()

    let infoOutput = "<p>Phonebook has info for "+persons.length+" people</p>";
    infoOutput += "<p>"+currDate+"</p>";

    res.send(infoOutput)
});

/**
 * Person delete function
 */
app.delete('/api/persons/id',(request,response)=>{
    const id = Number(request.params.id)
    const person = persons.find(person=> person.id === id)

    if(person){
        response.json(note)
    } else{
        response.status(404).end()
    }
});

/**
 * Port where server is enabled
 */
const PORT = 3001
app.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`)
});