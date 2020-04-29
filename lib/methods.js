'use strict'
const Question = require('../models/index').Questions

const setAnswerRight = async (questionId, answerId, user) => {
    let result

    try {
        result = await Question.setAnswerRight(questionId, answerId, user)
    } catch (error) {
        console.error(error);
        return false
    }

    return result
}

//
const getLast = async (amout) => {
    let data 

    try {
        data = await Question.getLast(amout)
    } catch (error) {
        console.error(error);
    }

    console.log('Se ejecuto el metodo');
    return data; 
}

module.exports = {
    setAnswerRight,
    getLast
}