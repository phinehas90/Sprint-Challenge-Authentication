const dbConfig = require('../knexfile.js');
const knex = require('knex');
const db = knex(dbConfig.development);

module.exports = {
    insertUser: user => {
        return db('users').insert(user)
    },

    getUser: user => {
        return db('users').where('username', user.username)
    },

    findUsers: () => {
        return db('users').select('id', 'username');
    },

    findUserByID: id => {
        return db('users').where({id}).first();
    }
}