
const { Sequelize  } = require('sequelize');
const sequelize =
    new Sequelize("artesania", "admin", "IdeasSoft2024%", {
        host: "database-1.ctm6s248ayce.us-east-1.rds.amazonaws.com",
        dialect: "mysql",
        port: "3306"//Tipo de base de dato a la cual esta conectado
    });

//new Sequelize('postgres://corllkus_user:&pu@NkNFl6?E@localhost:5432/corllkus_bdcolegiados')
var db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;


/*
const Sequelize = require('sequelize');
const sequelize = new Sequelize('bdmantenimiento', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres',
    port:'5433'//Tipo de base de dato a la cual esta conectado

});
var db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports=db;*/

