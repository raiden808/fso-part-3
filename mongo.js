const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

console.log("length: ",process.argv.length)

/**
 * Creates cluster name
 */
const url =
  `mongodb+srv://fullstack:${password}@cluster0-bczta.mongodb.net/phone-app?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true })

/**
 * Schema structure of document
 */
const phoneSchema = new mongoose.Schema({
    name: String,
    phone:String
})

/**
 * Initialise schema and name
 */
const Person = mongoose.model('Person',phoneSchema)

/**
 * Create Person 
 */
const newPerson = new Person({
    name:name,
    phone:number,
})

/**
 * Search for existing person
 */
if ( process.argv.length === 3) {
    Person.find({}).then(result => {
        result.forEach(person => {
        console.log(`${person.name} ${person.phone}`)
        })
        mongoose.connection.close()
        process.exit(1);
    })
}

/**
 * Saves to mongodb
 */
if(process.argv.length === 5){
    newPerson.save().then(response => {
        console.log(`Added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}








//process.exit(1)


// Person.findOne({name:name},function(err, result) {
//     if(result){
//         console.log("exist");
//     }

//     if(err){
//         console.log("dont exist.")
//     }

//     mongoose.connection.close()
// });


