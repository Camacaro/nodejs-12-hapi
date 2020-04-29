'use strict'

const Joi = require('@hapi/joi')
const site = require('./controllers/site')
const user = require('./controllers/user')
const question = require('./controllers/question')

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: site.home,
        options: {
            // config en cache del browser 
            cache: {
                expiresIn: 1000 * 30, // el tiempo de duracion del cache, esto se mide en milisegundos le ponemos 30 segundos
                privacy: 'private',
            }
        }
    },
    {
        method: 'GET',
        path: '/assets/{param*}',
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
                },
                // si falla el payload
                failAction: user.failValidation
            },
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
        method: 'GET',
        path: '/logout',
        handler: user.logout
    },
    {
        method: 'GET',
        path: '/question/{id}',
        handler: site.viewQuestion
    },
    {
        method: 'GET',
        path: '/ask',
        handler: site.ask
    },
    {
        method: 'POST',
        options: {
            validate: {
                payload: {
                    email: Joi.string().required().email(),
                    password: Joi.string().required().min(6),
                },
                // si falla el payload
                failAction: user.failValidation
            }
        },
        path: '/validate-user',
        handler: user.validateUser
    },
    {
        method: 'POST',
        options: {
            validate: {
                payload: {
                    title: Joi.string().required(),
                    description: Joi.string().required(),
                },
                // si falla el payload
                failAction: user.failValidation
            }
        },
        path: '/create-question',
        handler: question.createQuestion
    },
    {
        method: 'POST',
        options: {
            validate: {
                payload: {
                    answer: Joi.string().required(),
                    id: Joi.string().required(),
                },
                // si falla el payload
                failAction: user.failValidation
            }
        },
        path: '/answer-question',
        handler: question.answerQuestion
    },
    {
        method: 'GET',
        path: '/answer/{questionId}/{answerId}',
        handler: question.setAnswerRight
    },
    {
        method: ['GET', 'POST'],
        path: '/{any*}',
        handler: site.notFound
    },
]