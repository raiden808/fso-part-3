const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

/**
 * env file for mongo URI
 */
const url = process.env.MONGODB_URI

console.log('connecting to',url)

/**
 * Connection verification
 */
mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology: true})
    .then(result =>{
        console.log('Connected to MongoDB')
    })
    .catch((error)=>{
        console.log("error connecting to MongoDB", error.message)
    })

/**
 *  Document Schema structure
 */
const personSchema = mongoose.Schema({
    name:String,
    phone:String
})

/**
 * Modify Schema Output
 */
personSchema.set('toJSON',{
    transform:(document,returnedObject) =>{
        /**
         * Display proper id
         */
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id,
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person',personSchema)
