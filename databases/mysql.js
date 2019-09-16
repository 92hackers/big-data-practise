/**
 * Mysql database client
 */

const mysql = require('promise-mysql')
const config = require('../config')

const { host, port, user, password, database } = config.mysql


const initPool = () => {
  return mysql.createPool({
    connectionLimit: 10,
    host,
    port,
    user,
    password,
    database,
  })
}


module.exports = {
  initMysqlPoolClient: initPool,
}
