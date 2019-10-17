const cake = require('./../controllers/cakes.js');

module.exports= function(app){
    app.get('/cakes', (req,res)=>{
        cake.index(req,res);
    })
    app.post('/cakes', (req,res)=>{
    cake.create(req, res);
    })
    app.post('/ratings/:id', (req,res)=>{
        cake.update(req, res);
    })
    app.get('/cakes/:id', (req,res)=>{
        cake.show(req, res);
    })
}
