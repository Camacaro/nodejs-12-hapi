'use strict'

class Questions {
    constructor(db) {
        this.db = db
        // raiz de base de datos
        this.ref = this.db.ref()
        this.collection = this.ref.child('questions')
    }

    async create(data, user) {
        data.owner = user
        const question = await this.collection.push({...data});
        return question.key        
    }

    async getLast(amount) {
        
        const query = await this.collection
        .limitToLast(amount)
        .once('value')
        
        const data = query.val()
        return data
    }

    async getOne (id) {
        const query = await this.collection.child(id).once('value')
        const data = query.val()
        return data
    }

    async answer (data, user) {
        // esto es para guardar en question un arreglo de answer 
        // un arreglo de respuesta y user
        const answers = await this.collection
        .child(data.id)
        .child('answers') // cada arreglo tendra un arrglo de respuesta dentro
        .push({text: data.answer, user: user})

        return answers
    }
}

module.exports = Questions