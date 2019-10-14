'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ValoresCaracteristicaSchema extends Schema {
  up () {
    this.create('valores_caracteristicas', (table) => {
      table.increments('id')
      table.string('name')
      table.integer('feature_id').unsigned()
      table.timestamps()

      table.foreign('feature_id').references('id').inTable('caracteristicas').onDelete('CASCADE')
    })
  }

  down () {
    this.drop('valores_caracteristicas')
  }
}

module.exports = ValoresCaracteristicaSchema
