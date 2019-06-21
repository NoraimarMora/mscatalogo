'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ValoresCaracteristicaSchema extends Schema {
  up () {
    this.create('valores_caracteristicas', (table) => {
      table.increments('id')
      table.string('nombre')
      table.integer('caracteristica_id').unsigned()
      table.timestamps()

      table.foreign('caracteristica_id').references('id').inTable('caracteristicas').onDelete(CASCADE)
    })
  }

  down () {
    this.drop('valores_caracteristicas')
  }
}

module.exports = ValoresCaracteristicaSchema
