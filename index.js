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
app.get('/persons',(req,res)=>{
    res.json(persons)
});