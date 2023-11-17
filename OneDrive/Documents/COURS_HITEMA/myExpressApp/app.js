var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//mongoDB
const { MongoClient } = require('mongodb');

const uri = 'mongodb://dbsidy:5NqILqnC6IkGf2fYNbOMjjvd5lB7doIZH3cVthWrrgFG20827f99yfUdv94dSnZoOD5H1pSe6JjIACDbcddbGQ==@dbsidy.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@dbsidy@';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  try {
    await client.connect();
    console.log('Connexion à la base de données réussie');
  } catch (error) {
    console.error('Erreur de connexion à la base de données :', error);
  }
}

// Appel de la fonction connect au démarrage de l'application
connect();

// Fermeture de la connexion lorsque l'application est arrêtée
process.on('SIGTERM', () => {
  client.close();
  console.log('Fermeture de la connexion à la base de données');
});

var app = express();

// Point de terminaison POST pour l'insertion d'un nouveau document
app.post('/insertDocument', async (req, res) => {
  try {
    console.log('Contenu du corps de la requête :', req.body);
    console.log(req.body.database);
    console.log(req.body.collection);
    console.log(req.body.document);


    if (!req.body || !req.body.database || !req.body.collection || !req.body.document) {
      throw new Error('Corps de la requête mal formé');
    }

    const { database, collection, document } = req.body;
    const { id, nom, age } = document;

    const db = client.db(database);
    const col = db.collection(collection);

    const result = await col.insertOne({ id, nom, age });
    console.log(`Document inséré avec l'ID : ${result.insertedId}`);

    res.status(201).json({ message: 'Document inséré avec succès', insertedId: result.insertedId });
  } catch (error) {
    console.error('Erreur lors de l\'insertion du document :', error);
    res.status(500).json({ error: `Erreur serveur lors de l'insertion du document - ${error.message}` });
  }
});



// Point de terminaison GET pour récupérer tous les documents
app.get('/getDocuments', async (req, res) => {
  try {
    const { database, collection } = req.query;
    const db = client.db(database);
    const col = db.collection(collection);

    const documents = await col.find().toArray();
    res.status(200).json(documents);
  } catch (error) {
    console.error('Erreur lors de la récupération des documents :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des documents' });
  }
});


//modifs
// Point de terminaison PUT pour la mise à jour d'un document
app.use(express.json());

app.put('/updateDocument', async (req, res) => {
  try {
    console.log('Contenu du corps de la requête :', req.body);

    if (!req.body || !req.body.database || !req.body.collection || !req.body.filter || !req.body.update) {
      throw new Error('Corps de la requête mal formé');
    }

    const { database, collection, filter, update } = req.body;

    const db = client.db(database);
    const col = db.collection(collection);

    const result = await col.updateOne(filter, { $set: update });
    console.log(`Document mis à jour : ${result.modifiedCount}`);

    res.status(200).json({ message: 'Document mis à jour avec succès', modifiedCount: result.modifiedCount });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du document :', error);
    res.status(500).json({ error: `Erreur serveur lors de la mise à jour du document - ${error.message}` });
  }
});


// Point de terminaison delete pour la suppression d'un document
app.delete('/deleteDocument', async (req, res) => {
  try {
    console.log('Contenu du corps de la requête :', req.body);

    if (!req.body || !req.body.database || !req.body.collection || !req.body.filter) {
      throw new Error('Corps de la requête mal formé');
    }

    const { database, collection, filter } = req.body;

    const db = client.db(database);
    const col = db.collection(collection);

    const result = await col.deleteOne(filter);
    console.log(`Document supprimé : ${result.deletedCount} document(s) supprimé(s)`);

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Document supprimé avec succès' });
    } else {
      res.status(404).json({ error: 'Aucun document trouvé pour la suppression' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du document :', error);
    res.status(500).json({ error: `Erreur serveur lors de la suppression du document - ${error.message}` });
  }
});



// Routes pour les fichiers dans le répertoire routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Configuration de l'application
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Utilisation des routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Gestion des erreurs
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
