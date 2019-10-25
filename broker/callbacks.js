'use strict'

require('dotenv').config();
const mysql = require('mysql');

const { DB_HOST, 
        DB_PASSWORD, 
        DB_USER, DB_PORT, 
        DB_DATABASE } = process.env;

const con = mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
});

const callback = {

    brandCreated: async (brand) => {
        var parameters = brand.brand;

        try {
            var marca = {}

            marca.id = parameters.id;
            marca.name = parameters.name;

            var query = "INSERT INTO marcas (id, name) VALUES ("+marca.id+", '"+marca.name+"')";            
            await con.connect();
            await con.query(query, function (error, result) {
                if (error) {
                    console.log(error)
                    throw error;
                }

                console.log(result);
                console.log('status: 200 - Marca creada');
            })
        } catch(error) {
            console.log('status: 500 - Ha ocurrido un error');
        }
    },

    brandUpdated: async (brand) => {
        var parameters = brand.brand;

        try {
            marca = {}
            marca.id = parameters.id;
            marca.name = parameters.name;

            var query = "UPDATE marcas SET name = '" + marca.name + "' WHERE id = " + marca.id;            
            await con.connect();
            await con.query(query, function (error, result) {
                if (error) {
                    console.log(error)
                    throw error;
                }

                console.log(result);
                console.log('status: 200 - Marca actualizada');
            })
        } catch (err) {
            console.log('status: 500 - Ha ocurrido un error');
        }
    },

    brandDeleted: async (brand) => {
        var parameters = brand.brand;

        try {
            var marcaId = parameters.id;

            var query = "DELETE FROM marcas WHERE id = " + marcaId;                        
            await con.connect();
            await con.query(query, function (error, result) {
                if (error) {
                    console.log(error)
                    throw error;
                }

                console.log(result);
                console.log('status: 200 - Marca eliminada');
            })
        } catch (err) {
            console.log('status: 500 - Ha ocurrido un error');
        }
    },

    storeCreated: async (store) => {
        var parameters = store.store;
        
        try {
            var tienda = {}

            tienda.id = parameters.id;
            tienda.name = parameters.name;
            tienda.marca_id = parameters.marca_id;

            var query = "INSERT INTO tiendas (id, name, marca_id) VALUES (" + tienda.id + ", '" + tienda.name + "', " + tiennda.marca_id + ")";            
            await con.connect();
            await con.query(query, function (error, result) {
                if (error) {
                    console.log(error)
                    throw error;
                }

                console.log(result);
                console.log('status: 200 - Tienda creada');
            })
        } catch(error) {
            console.log('status: 500 - Ha ocurrido un error');
        }
    },

    storeUpdated: async (store) => {
        var parameters = store.store;

        try {
            var tienda = {}
            tienda.id = parameters.id;
            tienda.name = parameters.name;
            tienda.marca_id = parameters.marca_id;

            var query = "UPDATE tiendas SET name = '" + tienda.name + "', marca_id = " + tiennda.marca_id + " WHERE id = " + tienda.id;            
            await con.connect();
            await con.query(query, function (error, result) {
                if (error) {
                    console.log(error)
                    throw error;
                }

                console.log(result);
                console.log('status: 200 - Tienda actualizada');
            })
        } catch (err) {
            console.log('status: 500 - Ha ocurrido un error');
        }
    },

    storeDeleted: async (store) => {
        var parameters = store.store;

        try {
            var tiendaId = parameters.id;

            var query = "DELETE FROM tiendas WHERE id = " + tiendaId;            
            await con.connect();
            await con.query(query, function (error, result) {
                if (error) {
                    console.log(error)
                    throw error;
                }

                console.log(result);
                console.log('status: 200 - Tienda eliminada');
            })
        } catch (err) {
            console.log('status: 500 - Ha ocurrido un error');
        }
    }

}

module.exports = callback;