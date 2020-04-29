'use strict'

const Handlebars = require('handlebars')

const registerHelpers = () => {
    Handlebars.registerHelper('answerNumber', (answers) => {
        const keys = Object.keys(answers)
        return keys.length
    })

    // definicion clasica de un metodo de bloques
    Handlebars.registerHelper('ifEquals', (userA, userB, options) => {
        if( userA === userB ) {
            return options.fn(this)
        }

        return options.inverse(this)
    })

    return Handlebars
}

module.exports = registerHelpers()