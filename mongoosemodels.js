const mongoose = require ('mongoose');
let url = 'mongodb+srv://HulkSmash:HULK_1208@cluster0-fvlyo.mongodb.net/test?retryWrites=true';

mongoose.connect(url, {
    useNewUrlParser:true
});

let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

const perritosEsquema = new Schema({
 
    raza: String,
    nombre: String,
    edad: String,
    descripcion: String,

});

const alberguesEsquema = new Schema({
    albergue: ObjectId,
    nombre:String,
    ubicacion: String,
    perros:[{type: ObjectId, ref:"Perros"}]




})

let Perros = mongoose.model ("Perros", perritosEsquema)
let Albergues = mongoose.model ("Albergues", alberguesEsquema)

module.exports = {Perros,Albergues};