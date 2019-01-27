const axios = require('axios');
const db = require('../database/dbHelper');

const { authenticate, hash, generateToken } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  const user = req.body;
    if(user.username && user.password){
      user.password = hash(user.password);
      db.insertUser(user)
          .then(ids => {
              const id = ids[0];
              db.findUserByID(id)
                  .then(user => {
                      const token = generateToken(user);
                      console.log(token);
                      res.status(201)
                          .json({id : user.id, token});
                  })
                  .catch(err => {
                      res.status(500).send(err);
                  })
          })
          .catch(err => {
              res.status(500).send(console.log(err));
          })
    } else {
        res.status(400)
            .send({message: "You must provide a username and password" })
    }
}

function login(req, res) {
  // implement user login
  
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
