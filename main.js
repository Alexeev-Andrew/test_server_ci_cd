var express = require('express');
var path = require('path');
var morgan = require('morgan')
var bodyParser = require('body-parser');
var sql = require("mssql");


function configureEndpoints(app) {
    var api = require('./api');
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });

    //Налаштування URL за якими буде відповідати сервер

    app.get('/get_api', api.get_doctors_by_last_name);

    app.use(express.static('static'));
    // httpApp.use("/.well-known/acme-challenge", express.static("/static/.well-known/acme-challenge"));
}

function startServer(port) {
    //Створюється застосунок
    var app = express();

    //Налаштування директорії з шаблонами
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    //Налаштування виводу в консоль списку запитів до сервера
    app.use(morgan('dev'));

    //Розбір POST запитів
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    //Налаштовуємо сторінки
    configureEndpoints(app);

    //Запуск додатка за вказаним портом
    app.listen(port, function () {
        console.log('My Application Running on http://localhost:'+port+'/');
    });
}



exports.startServer = startServer;