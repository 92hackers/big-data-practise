/**
 * Database entry
 */

const modelDefinitions = require('./zhihu_models')
const {
  initMysqlPoolClient,
} = require('./mysql')

const initDatabase = async () => {
  const mysqlClient = await initMysqlPoolClient()

  const querys = modelDefinitions.map(modelSql => mysqlClient.query(modelSql))
  const createTablesResult = await Promise.all(querys)

  if (createTablesResult && createTablesResult.length) {
    console.log('Init mysql database successfully')
  }
}

initDatabase()

module.exports = {
  initDatabase,
}
