/**
 * A app designed to generate billions data
 */

const {
  initDatabase,
  modelDefinitions,
} = require('../databases')

const [
  accountModel,
] = modelDefinitions

const generateAccounts = async (mysqlClient) => {
  const data = accountModel.generate_account()

  const columns = []
  const values = []

  Object.entries(data).forEach(([ column, value ]) => {
    columns.push(column)
    values.push(`"${value}"`)
  })

  const columnsStr = `(${columns.join(',')})`
  const valuesStr = `(${values.join(',')})`

  const sql = `
    INSERT INTO ${accountModel.tableName}${columnsStr}
    VALUES${valuesStr};
  `

  const res = await mysqlClient.query(sql)

  if (res && res.affectedRows > 0) {
    console.log(`Create an new account: ${data.account_id} successfully`)
  }
}

const main = async () => {
  const mysqlClient = await initDatabase()

  generateAccounts(mysqlClient)
}

main()
