const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const moongose = require('mongoose')
const { Schema } = moongose

require('dotenv').config({ path: process.env.DOTENV_CONFIG_PATH})
console.log(process.env) // remove this after you've confirmed it working

// user => jean
// pwd => 7lu8hkUadnNIG6dj

const dogSchema = new Schema({
    name: String,
    age: String
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 8080
const router = express.Router()

var mongoose = require('mongoose'); // Utilizamos la librería de mongoose

const _uri = process.env.URI_FORMAT || "mongodb"

// const uri = "mongodb+srv://jean:7lu8hkUadnNIG6dj@cluster0.z37br.mongodb.net/myFirstDatabase";
// const uri =
//   `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
//   `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

let uri

if (_uri === "mongodb+srv") {
    uri = `${_uri}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`
} else {
    uri = `${_uri}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
}

console.log(uri)

// process.exit(1);
try {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("Mongoose is connected"));
} catch (error) {
    console.log("could not connect");
}


const Dog = mongoose.model("Dog", dogSchema)

router.get("/", function(req, res) {
    res.json({ message: "Hoola "})
})

router.route("/dogs")
    .post(async function(req, res){
        console.log("/dogs")
        const dog = new Dog({
            name: req.body.name,
            age: req.body.age,
        })
        console.log(dog instanceof Dog)
        console.log(dog instanceof moongose.Model)
        console.log(dog instanceof moongose.Document)
        console.log(typeof(dog))
        console.log(req.body.name)
        // dog.save().then(() => console.log('meow'));
        try {
            await dog.save()
            res.json({message: "Creamos un perrito"})
        } catch (error) {
            res.send(error)
        }
    })

router.route('/dogs')
    .get(async function(req, res) {
        try {
            const response = await Dog.find()
            console.log(response)
            res.json(response)
        } catch (error) {
            console.log(error.stack)
            res.send(error)
        }
        // Dog.find(function(err, dogs) {
        //     if (err){
        //         res.send(err);
        //     }
        //     res.json(dogs);
        // })
    })

//Ruta para editar un perrito
router.route('/dogs/:dog_id')
    // El estandár para editar es PUT
    .put(function(req, res) {
    // Usamos la funcion findById de mongoose para encontrar
    // el perrito que queremos editar 
    Dog.findById(req.params.dog_id, function(err, dog) {
    
        if (err){//si hay errores los regresamos
            res.send(err);
        }
      
        //Modificamos el registro
        dog.age = req.body.age; 
        // Guardamos
        dog.save(function(err) {
            if (err){
                res.send(err);
            }
            res.json({ message: 'El perrito ' +  dog.name + ' fue actualizado correctamente'});
            });
        });
    })
    .delete(function(req, res) {
     Dog.remove({
       _id: req.params.dog_id
       }, function(err, dog) {
         if (err){
           res.send(err);
         }
         
         res.json({ message: 'El perrito fue eliminado correctamente'});
     });
   });

app.use("/api", router)

app.listen(port)
console.log("Listen on port : " + port)