
const express = require('express');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

const { Perros, Albergues } = require('./mongoosemodels');



app.get( '/', ( req, res) => {
    res.send('guau')
});


app.post('/api/perros/crear', (req,res)=>{
let perros = req.body.perros;

console.log(req.body)

    let promesas = perros.map((perro)=>{

        const {raza, nombre, edad, descripcion} = perro

        let nuevoPerro = Perros({
            raza,
            nombre,
            edad,
            descripcion
        })
        
        return nuevoPerro.save().then((perro)=> {
            return perro
        });

    });

    Promise.all(promesas).then((cosas)=>{

        res.send(cosas)

    })
console.log (res)
});

app.get ("/api/perros", (req,res)=>{
    Perros.find({}, (err,perros)=>{
        res.send (perros);
    })

          
})
app.post("/api/albergues/crear/", (req,res)=>{
    let albergues = req.body;
    
    console.log(req.body)
    
        let promesas = albergues.map((albergue)=>{
    
            const { nombre, ubicacion, perros} = albergue
    
            let nuevoAlbergue = Albergues({
                nombre,
                ubicacion,
                perros
            })
            
            return nuevoAlbergue.save().then((albergue)=> {
                return albergue
            });
    
        });
    
        Promise.all(promesas).then((cosas)=>{
    
            res.send(cosas)
    
        })
    console.log (res)
    });

    app.get('/api/albergues', (req, res) => {
        Albergues.find({}, (err, perros) => {
            Perros.populate(perros, {  
                path: 'perros'
            }, (err, result) => {
                res.send(result);
            });
        });
    });
    



app.listen(3000,()=>console.log('server on 3000'))
