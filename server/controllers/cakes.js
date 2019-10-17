const mongoose = require('mongoose');
const Rating = mongoose.model('Rating');
const Cake = mongoose.model('Cake');

module.exports = {
    index: function(req, res) {
        console.log("GET /cakes");
        Cake.find()
        .then(allcakes=> {res.json(allcakes); console.log('all cakes', allcakes);})
        .catch(err => res.json(err));
    },
    create: function(req, res) {
        console.log('POST /cakes');
        console.log('req body', req.body);
        const cake = new Cake(req.body);
        cake.save()
        .then(newcake => {console.log('new cake', newcake); 
        res.json({message: newcake.baker + ' added', cake: newcake});})
        .catch(err => res.json(err));
    },
    update: function(req,res){
        console.log('POST /ratings/:id');
        console.log('new rating', req.body);
        const {id} = req.params;
        console.log('cake id used: ', id);
        const rating = new Rating(req.body);
        rating.save()
            .then(newrating => {
                console.log('rating', newrating);
                Cake.findByIdAndUpdate(id, {$push: {ratings: newrating}}, {new: true})      // need {new: true} to grab new rating. Without, updated cake is the old cake.
                .then(updatedcake => {console.log('updated cake:', updatedcake); res.json(updatedcake);})
                .catch(err => res.json(err));
            })
            .catch(err => res.json(err));
    },
    show: function(req,res){
        console.log('GET /cakes/:id');
        const {id} = req.params;
        console.log('requested cake id: ', id);
        Cake.findById(id)
        .then(cake => {console.log('cake selected:', cake); res.json(cake);})
        .catch(err => res.json(err));
    }
};