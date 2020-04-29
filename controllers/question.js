'use strict'
const { writeFile } = require('fs')
const { promisify } = require('util')
const { join } = require('path')
const { v1: uuidv1 } = require('uuid');
const Questions = require('../models/index').Questions

// esto es para colocar la promesa y usar async y await
const write = promisify(writeFile)

const createQuestion = async (req, h) => {

    if(!req.state.user) {
        return h.redirect('/login')
    }

    let result, filename

    try {

        if( Buffer.isBuffer(req.payload.image) ) {
            filename = `${ uuidv1() }.png`
            await write( join(__dirname, '..', 'public', 'uploads', filename), req.payload.image )
        }

        result = await Questions.create(req.payload, req.state, filename)
    } catch (error) {
        // console.error('Ocurrio un error: ', error);
        req.log('error', error)
        return h.view('ask',{
            title: 'Crear pregunta',
            error: 'Problemas creando la pregunta'
        } ).code(500).takeover()
    }

    // return h.response(`Pregunta creada con el ID ${result}`)
    return h.redirect(`/question/${result}`)
}

const answerQuestion = async (req, h) => {

    if(!req.state.user) {
        return h.redirect('/login')
    }

    let result
    try {
        result = await Questions.answer(req.payload, req.state.user)
        // console.log(`Rescuespa creada: ${result}`);
        req.log('info', `Rescuespa creada: ${result}`)
    } catch (error) {
        // console.error(error)
        req.log('error', error)
    }

    // console.log(req.payload.id);
    req.log('info', req.payload.id)
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

        // console.log(result);
        req.log('info', result)

    } catch (error) {
        // console.error(error);
        req.log('error', error)
    }

    return h.redirect(`/question/${req.params.questionId}`)
}

module.exports = {
    createQuestion,
    answerQuestion,
    setAnswerRight
}