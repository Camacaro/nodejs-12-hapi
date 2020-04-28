'use strict'

const register = (request, h) => {

    if( request.state.user ) {
        return h.redirect('/')
    }

    return h.view('register', {
        title: 'Registro',
        // esta informacion la tomo del cookies que cree en user controller
        user: request.state.user
    })
}

const home = (request, h) => {
    return h.view('index', {
        title: 'Home',
        // esta informacion la tomo del cookies que cree en user controller
        user: request.state.user
    })
}

const login = (request, h) => {
    
    if( request.state.user ) {
        return h.redirect('/')
    }

    return h.view('login', {
        title: 'Ingrese',
        // esta informacion la tomo del cookies que cree en user controller
        user: request.state.user
    })
}

const notFound = (request, h) => {
    return h.view('404', {}, {layout: 'error-layout'} ).code(404)
}

const fileNotFound = (request, h) => {
    const response = request.response
    if( response.isBoom && response.output.statusCode ===  404) {
        return h.view('404', {}, {layout: 'error-layout'} ).code(404)
    }

    // esto es para que continue con el ciclo de vida sino consiguio el 404
    return h.continue
}


module.exports = {
    register,
    home,
    login,
    notFound,
    fileNotFound
}