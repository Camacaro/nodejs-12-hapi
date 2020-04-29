'use strict'
const Questions = require('../models/index').Questions

const createQuestion = async (req, h) => {

    if(!req.state.user) {
        return h.redirect('/login')
    }

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

const answerQuestion = async (req, h) => {

    if(!req.state.user) {
        return h.redirect('/login')
    }

    let result
    try {
        result = await Questions.answer(req.payload, req.state.user)
        console.log(`Rescuespa creada: ${result}`);
    } catch (error) {
        console.error(error)
    }

    console.log(req.payload.id);
    return h.redirect(`/question/${req.payload.id}`)
}

const setAnswerRight = async (req, h) => {
    
    if(!req.state.user) {
        return h.redirect('/login')
    }

    let result 
    
    try {
        
        result = await req
        .server
        .methods
        .setAnswerRight(req.params.questionId, req.params.answerId, req.state.user)

        console.log(result);

    } catch (error) {
        console.error(error);
    }

    return h.redirect(`/question/${req.params.questionId}`)
}

module.exports = {
    createQuestion,
    answerQuestion,
    setAnswerRight
}