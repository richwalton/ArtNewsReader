const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

// Link to Database
// ========================
// Updates environment variables

const mongoArtData = 'mongodb+srv://richwalton:Z7QpJbEqnRS5ib3D@cluster0.dyuho.mongodb.net/art_news_database?retryWrites=true&w=majority'

MongoClient.connect(mongoArtData, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('art_news_database')

    // Middlewares
    // ========================
    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static('public'));

    // Route
    // ========================
    
          app.get('/', (req, res) => {
            let artNPRes = db.collection('artNewsPaper').find().toArray()
            let artNRes = db.collection('artNews').find().toArray()
            let artNetRes = db.collection('artNet').find().toArray()
            let hyprAlRes = db.collection('hyperAllergic').find().toArray()
            let artsyRes = db.collection('artsy').find().toArray()
            let artFRes = db.collection('artForum').find().toArray()
            
            Promise.all([ artNPRes, artNRes, artNetRes, hyprAlRes, artsyRes, artFRes]).then((
            [ artNPRes, 
              artNRes, 
              artNetRes, 
              hyprAlRes, 
              artsyRes, 
              artFRes ]) =>
              res.render('index.ejs', {artNP: artNPRes, artNews: artNRes, artNet: artNetRes, hyperAll:hyprAlRes, artsy: artsyRes, artForum: artFRes }))
              .catch(err => res.send('Ops, something has gone wrong'))
          })    

    // Listen
    // ========================
    app.listen(4000, function() {
        console.log('listening on 4000')
    }) 
})
.catch(error => console.error(error));