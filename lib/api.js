'use strict'

const Joi = require('@hapi/joi')
const Questions = require('../models/index').Questions
const Boom = require('@hapi/boom')
const authBasic = require('@hapi/basic')
const Users = require('../models/index').Users

module.exports = {
    name: 'api-rest',
    version: '1.0.0',
    async register( server, options ) {
        const prefix = options.prefix || 'api'

        await server.register( authBasic )

        server.auth.strategy('simple', 'basic', { validate: validateAuth })

        // server.auth.default('simple')

        server.route({
            method: 'GET',
            path: `/${prefix}/question/{key}`,
            options: {
                auth: 'simple',
                validate: {
                    params: {
                        key: Joi.string().required()
                    },
                    failAction: failValidation
                }
            },
            handler: async (req, h) => {
                let result
                
                try {
                    result = await Questions.getOne(req.params.key)
                    if(!result) {
                        return Boom.notFound(`No se pudo encontrar la pregunta ${req.params.key}`)
                    }
                } catch (error) {
                    return Boom.badImplementation(`Hubo un error buscando ${req.params.key} - ${error}`)
                }

                return result
            }
        })

        server.route({
            method: 'GET',
            path: `/${prefix}/questions/{amount}`,
            options: {
                auth: 'simple',
                validate: {
                    params: Joi.object({
                        amount: Joi.number().integer().min(1).max(20).required()
                    }),
                    failAction: failValidation
                }
            },
            handler: async (req, h) => {
                let result
                
                try {
                    result = await Questions.getLast(req.params.amount)
                    if(!result) {
                        return Boom.notFound(`No se pudo recuperar las preguntas`)
                    }
                } catch (error) {
                    return Boom.badImplementation(`Hubo un error buscando las preguntas - ${error}`)
                }

                return result
            }
        })

        function failValidation (req, h) {
            return Boom.badRequest('Por favor use los parametros correctos')
        }

        async function validateAuth(req, username, password, h) {
            let user
            
            try {
                user = await Users.validateUser({email: username, password})
            } catch (error) {
                server.log('error', error)
            }

            return {
                credentials: user || {},
                isValid: (user !== false)
            }
        }
    }
}