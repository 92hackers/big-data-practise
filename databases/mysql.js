/**
 * Mysql database client
 */

const mysql = require('promise-mysql')
const config = require('../config')

const { host, port, user, password, database } = config.mysql


const initPool = async () => {
  const pool = await mysql.createPool({
    connectionLimit: 10,
    host,
    port,
    user,
    password,
    database,
  }).catch(err => {
    console.log('Establish connection to Mysql Failed, with errors: ')
    console.log(err)
  })

  return pool
}


module.exports = {
  initMysqlPoolClient: initPool,
}
