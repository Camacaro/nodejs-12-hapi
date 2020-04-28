'use strict'
const Questions = require('../models/index').Questions

const createQuestion = async (req, h) => {

    let result

    try {
        result = await Questions.create(req.payload, req.state)
    } catch (error) {
        console.error('Ocurrio un error: ', error);
        return h.view('ask',{
            title: 'Crear pregunta',
            error: 'Problemas creando la pregunta'
        } ).code(500).takeover()
    }

    return h.response(`Pregunta creada con el ID ${result}`)
}

module.exports = {
    createQuestion,
}