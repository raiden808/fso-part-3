const mongoose = require('mongoose')

/**
 * Advance validator mongoose plugin
 */
const uniqueValidator = require('mongoose-unique-validator');

/**
 * Remove depreciation warnings.
 */
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true);

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
 *  Document Schema structure and Validations
 */
const personSchema = mongoose.Schema({
    name:{
        type: String,
        minlength: 5,
        required: true,
        unique:true
    },
    phone:{
        type: String,
        minlength: 8,
        required: true,
        unique:true
    }
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

/**
 * apply mongoose-unique-validator
 */
personSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Person',personSchema)
