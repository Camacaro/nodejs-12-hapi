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


module.exports = {
    register,
    home,
    login,
    notFound
}