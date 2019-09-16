/**
 * Database entry
 */

const modelDefinitions = require('./zhihu_models')
const {
  initMysqlPoolClient,
} = require('./mysql')

const initDatabase = async () => {
  const mysqlClient = await initMysqlPoolClient()

  const querys = modelDefinitions.map(({ sql }) => mysqlClient.query(sql))
  const createTablesResult = await Promise.all(querys)

  if (createTablesResult && createTablesResult.length) {
    console.log('Init mysql database successfully')
  }

  return mysqlClient
}

module.exports = {
  initDatabase,
  modelDefinitions,
}
