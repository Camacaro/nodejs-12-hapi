'use strict'

const register = (request, h) => {
    return h.view('register', {
        title: 'Registro'
    })
}

const home = (request, h) => {
    return h.view('index', {
        title: 'Home'
    })
}

const login = (request, h) => {
    return h.view('login', {
        title: 'Ingrese'
    })
}


module.exports = {
    register,
    home,
    login
}