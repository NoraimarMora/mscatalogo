'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TiendasSchema extends Schema {
  up () {
    this.create('tiendas', (table) => {
      table.integer('id').unsigned().primary('id')
      table.string('nombre')
      table.timestamps()
    })
  }

  down () {
    this.drop('tiendas')
  }
}

module.exports = TiendasSchema
