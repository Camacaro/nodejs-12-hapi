'use strict'

const Users = require('../models/index').Users

const createUser = async (request, h) => {
    
    let result 
    
    try {
        result = await Users.create(request.payload)
    } catch (error) {
        console.error(error)
        return h.response('Problemas creando el usuario').code(500)
    }
    
    return h.response( `Usuario creado ID: ${result}` )
}

const validateUser = async (request, h) => {
    
    let result 
    
    try {
        result = await Users.validateUser(request.payload)

        if( !result ) {
            return h.response('Email y/o contraseña incorrecta').code(401)
        }

    } catch (error) {
        console.error(error)
        return h.response('Problemas validando el usuario').code(500)
    }
    
    // return result
    // con state asigno la cookie
    return h.redirect('/').state('user', {
        name: result.name,
        email: result.email
    })
}

module.exports = {
    createUser,
    validateUser,
}