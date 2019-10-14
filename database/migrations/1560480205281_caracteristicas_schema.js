'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CaracteristicasSchema extends Schema {
  up () {
    this.create('caracteristicas', (table) => {
      table.increments('id')
      table.string('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('caracteristicas')
  }
}

module.exports = CaracteristicasSchema
