'use strict'

const Joi = require('@hapi/joi')
const site = require('./controllers/site')
const user = require('./controllers/user')

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: site.home
    },
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.', // directorio public
                index: ['index.html']
            }
        }
    },
    {
        method: 'GET',
        path: '/register',
        handler: site.register
    },
    {
        method: 'POST',
        options: {
            validate: {
                payload: {
                    name: Joi.string().required().min(3),
                    email: Joi.string().required().email(),
                    password: Joi.string().required().min(6),
                }
            }
        },
        path: '/create-user',
        handler: user.createUser
    },
    {
        method: 'GET',
        path: '/login',
        handler: site.login
    },
    {
        method: 'POST',
        options: {
            validate: {
                payload: {
                    email: Joi.string().required().email(),
                    password: Joi.string().required().min(6),
                }
            }
        },
        path: '/validate-user',
        handler: user.validateUser
    },
]