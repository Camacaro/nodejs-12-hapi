'use strict'
const questions = require('../models/index').Questions

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

const home = async (request, h) => {

    // let data 

    // try {
    //     data = await questions.getLast(10)
    // } catch (error) {
    //     console.error(error);
    // }

    // ahora tomamos esa funcion desde el servidor
    const data = await request.server.methods.getLast(10)

    return h.view('index', {
        title: 'Home',
        // esta informacion la tomo del cookies que cree en user controller
        user: request.state.user,
        questions: data
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
    if( !request.path.startsWith('/api') && response.isBoom && response.output.statusCode ===  404) {
        return h.view('404', {}, {layout: 'error-layout'} ).code(404)
    }

    // esto es para que continue con el ciclo de vida sino consiguio el 404
    return h.continue
}

const ask = (request, h) => {
    if( !request.state.user ) {
        return h.redirect('/login')
    }

    return h.view('ask', {
        title: 'Crear pregunta',
        user: request.state.user
    })
}

const viewQuestion = async (req, h) => {
    let data
    try {
        data = await questions.getOne(req.params.id)
        if(!data){
            return notFound(req, h)
        }
    } catch (error) {
        console.error(error)
    }

    return h.view('question', {
        title: 'Detalles de la pregunta',
        user: req.state.user,
        question: data,
        key: req.params.id
    })
}


module.exports = {
    register,
    home,
    login,
    notFound,
    fileNotFound,
    ask,
    viewQuestion
}