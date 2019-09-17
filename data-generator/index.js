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
  const start = Date.now()
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

  console.log('Sending create new account sql string to Mysql')

  const res = await mysqlClient.query(sql).catch(err => err)

  const millSeconds = Date.now() - start

  if (res && res.affectedRows > 0) {
    console.log(`Successfully create an new account: ${data.account_id} in ${millSeconds} millseconds`)
  } else {
    console.log(`Failed to create an new account with Error: ${res.sqlMessage}`)
  }
}

const concurrentJobs = 10
const totalAccounts = 1000000

const main = async () => {
  const start = Date.now()

  const mysqlClient = await initDatabase()

  const outerCount = totalAccounts / concurrentJobs
  let i = 0
  let j = 0

  while (i < outerCount) {
    const promises = []
    j = 0
    while (j < concurrentJobs) {
      promises.push(generateAccounts(mysqlClient))
      j++
    }

    await Promise.all(promises)
    i++
  }

  const seconds = (Date.now() - start) / 1000

  console.log(`Finished creating ${totalAccounts} accounts in ${seconds} seconds`)
}

main()
