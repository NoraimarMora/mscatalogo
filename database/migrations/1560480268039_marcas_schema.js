'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MarcasSchema extends Schema {
  up () {
    this.create('marcas', (table) => {
      table.integer('id').unsigned().primary('id')
      table.string('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('marcas')
  }
}

module.exports = MarcasSchema
