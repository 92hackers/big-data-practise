/**
 * A app designed to generate billions data
 */

const {
  initDatabase,
  modelDefinitions,
} = require('../databases')

const utils = require('../utils')

const [
  accountModel,
] = modelDefinitions

const generateAccounts = async (mysqlClient) => {
  const start = Date.now()
  const data = accountModel.generate_account()

  const sql = utils.getInsertSql(accountModel.tableName, data)
  console.log('Sending create new account sql string to Mysql')

  const res = await mysqlClient.query(sql).catch(err => err)

  const millSeconds = Date.now() - start

  if (res && res.affectedRows > 0) {
    console.log(`Successfully create an new account: ${data.account_id} in ${millSeconds} millseconds`)
  } else {
    console.log(`Failed to create an new account with Error: ${res.sqlMessage}`)
  }
}

const concurrentJobs = 50
const totalAccounts = 10000000

const main = async () => {
  const start = Date.now()

  const mysqlClient = await initDatabase()
  const dataGeneratorRunner = utils.dataGeneratorRunner(mysqlClient)

  await dataGeneratorRunner({
    concurrentJobs,
    grossRowsCount: totalAccounts,
    generator: generateAccounts,
  })

  const seconds = (Date.now() - start) / 1000

  console.log(`Finished creating ${totalAccounts} accounts in ${seconds} seconds`)
  // Running records:
  // 1. Finished creating 1000000 accounts in 2432.648 seconds
  // 2. Finished creating 1000000 accounts in 2445.475 seconds
  // 3. Finished creating 1000000 accounts in 2088.811 seconds concurrentJobs = 100
}

main()
