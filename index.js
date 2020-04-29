'use strict';

const Hapi = require('@hapi/hapi');
const inert  = require('@hapi/inert')
const Path = require('path')
const Vision = require('@hapi/vision');
const Handlebars = require('handlebars')
const Joi = require('@hapi/joi')
const routes = require('./routes')
const site = require('./controllers/site')

// helpers, para que me retorne el numer de respuesta
Handlebars.registerHelper('answerNumber', (answers) => {
    const keys = Object.keys(answers)
    return keys.length
})

const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: 'localhost',
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    });

    await server.register(inert);
    await server.register(Vision);
    await server.validator(Joi),

    /**
     * Especificar cookies para mantener login
     */
    server.state('user', {
        ttl: 1000 * 60 * 60 * 24, // esa operacion se calcula en milisegundo (seg * min * hora * dia * mas dia) una semana, time to leep
        isSecure: process.env.NODE_ENV === 'prod', // preguntra si la cookie sera segura o no, en local es insegura
        encoding: 'base64json',
    })

    // configuracion del motor de plantilla
    server.views({
        engines: {
            hbs: Handlebars
        },
        relativeTo: __dirname, // con el fin de que las vistas esten por fueran del public
        path: 'views', // donde estaran las vistas
        layout: true, // todo se redireccionara dentro de la variable content
        layoutPath: 'views'
    })

    // esto es para escuchar el ciclo de vida 
    // aqui usare el antes de servir la respuesta al usuario
    server.ext('onPreResponse', site.fileNotFound)

    /** Rutas importadas */
    server.route(routes)

    // Primera ruta para la muestra del home el archivo index.hbs dentro del layaut
    // mandando una variable title
    // server.route({
    //     method: 'GET',
    //     path: '/',
    //     handler: (request, h) => {
    //         return h.view('index', {
    //             title: 'Home'
    //         })
    //     }
    // });

    // /** Rutas  */
    // server.route({
    //     method: 'GET',
    //     path: '/register',
    //     handler: (request, h) => {
    //         return h.view('register', {
    //             title: 'Registro'
    //         })
    //     }
    // });

    // server.route({
    //     method: 'POST',
    //     path: '/create-user',
    //     handler: (request, h) => {
            
    //         // parametros que se recibe por post
    //         console.log(request.payload);
            
    //         return 'Usuario creado'
    //     }
    // });


    // /** Fin de rutas */

    // // EJemplo para mostrar archivo estatico
    // server.route({
    //     method: 'GET',
    //     path: '/home',
    //     handler: (request, h) => {

    //         return h.file('index.html')
    //     }
    // });
    // server.route({
    //     method: 'GET',
    //     path: '/{param*}',
    //     handler: {
    //         directory: {
    //             path: '.', // directorio public
    //             index: ['index.html']
    //         }
    //     }
    // });

    // Ejemplo de redireccionar
    // server.route({
    //     method: 'GET',
    //     path: '/redirect',
    //     handler: (request, h) => {
    //         return h.redirect('http://platzi.com')
    //     }
    // });

    // // Ejemplo del Hola Mundo
    // server.route({
    //     method: 'GET',
    //     path: '/hola',
    //     handler: (request, h) => {
    //         return h.response('Hola mundo...').code(200);
    //     }
    // });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

// esto es para capturar todos los errores que se puedan generar
// una promesa que no se cumplio
process.on('unhandledRejection', (err) => {
    console.log('unhandledRejection', err);
    process.exit(1);
});

// este es para manejar cualquier error
process.on('unhandledException', (err) => {
    console.log('unhandledException', err);
    process.exit(1);
});

init();