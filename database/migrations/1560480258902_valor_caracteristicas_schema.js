'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ValorCaracteristicasSchema extends Schema {
  up () {
    this.create('valor_caracteristicas', (table) => {
      table.increments('id')
      table.string('name')
      table.integer('caracteristica_id').unsigned()
      table.timestamps()

      table.foreign('caracteristica_id').references('id').inTable('caracteristicas').onDelete('CASCADE')
    })
  }

  down () {
    this.drop('valor_caracteristicas')
  }
}

module.exports = ValorCaracteristicasSchema
