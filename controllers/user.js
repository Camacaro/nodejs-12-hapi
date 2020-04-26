'use strict'

const Boom = require('@hapi/boom');

const Users = require('../models/index').Users

const createUser = async (request, h) => {
    
    let result 
    
    try {
        result = await Users.create(request.payload)
    } catch (error) {
        console.error(error)
        // return h.response('Problemas creando el usuario').code(500)
        return h.view('register', {
            title: 'Registro',
            error: 'Error creando el usuario'
        })
    }
    
    // return h.response( `Usuario creado ID: ${result}` )
    return h.view('register', {
        title: 'Registro',
        success: 'Usuario creado exitosamente'
    })
}

const validateUser = async (request, h) => {
    
    let result 
    
    try {
        result = await Users.validateUser(request.payload)

        if( !result ) {
            // return h.response('Email y/o contraseña incorrecta').code(401)
            return h.view('login', {
                title: 'Login',
                error: 'Email y/o contraseña incorrecta'
            })
        }

    } catch (error) {
        console.error(error)
        // return h.response('Problemas validando el usuario').code(500)
        return h.view('login', {
            title: 'Login',
            error: 'Problemas validando el usuario'
        })
    }
    
    // return result
    // con state asigno la cookie
    // y le coloco los datos que tendra
    return h.redirect('/').state('user', {
        name: result.name,
        email: result.email
    })
}

const logout = (request, h) => {
    return h.redirect('/login').unstate('user')
}

const failValidation = (request, h, err) => {
    return Boom.badRequest('Falló la validacion', request.payload)
}

module.exports = {
    createUser,
    validateUser,
    logout,
    failValidation
}