/**
 * A app designed to generate billions data
 */

const Mock = require('mockjs')

const {
  initDatabase,
  modelDefinitions,
} = require('../databases')

const {
  concurrentJobs,
  totalAccounts,
  totalQuestions,
  totalAnswers,
} = require('../config')

const utils = require('../utils')

const [
  accountModel,
  questionModel,
  answerModel,
] = modelDefinitions

const { Random } = Mock


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


const generateQuestions = async (mysqlClient) => {
  const start = Date.now()

  const randomId = Random.natural(1, totalAccounts)
  const queryAuthorIdSql = `
    select account_id from ${accountModel.tableName} where id=${randomId}
  `
  let res = await mysqlClient.query(queryAuthorIdSql).catch(err => err)

  if (!res || !res.length) {
    console.log(`Failed to query account id for random Id: ${randomId} with error: ${res.sqlMessage}`)
    return
  }

  const authorId = res[0].account_id
  const data = questionModel.generate_question(authorId)
  const sql = utils.getInsertSql(questionModel.tableName, data)

  console.log('Sending sql string to create new question')

  res = await mysqlClient.query(sql).catch(err => err)

  const millSeconds = Date.now() - start

  if (res && res.affectedRows > 0) {
    console.log(`Successfully create an new question: ${data.question_id} in ${millSeconds} millseconds`)
  } else {
    console.log(`Failed to create an new account with Error: ${res.sqlMessage}`)
  }
}


// TODO: 使用 node.js cluster 模式，提高效率
//
const main = async () => {
  const mysqlClient = await initDatabase()
  const dataGeneratorRunner = utils.dataGeneratorRunner(mysqlClient)

  // Generate accounts data
  // await dataGeneratorRunner({
  //   concurrentJobs,
  //   grossRowsCount: totalAccounts,
  //   generator: generateAccounts,
  //   tableName: accountModel.tableName,
  // })

  // Generate questions data
  await dataGeneratorRunner({
    concurrentJobs,
    grossRowsCount: totalQuestions,
    generator: generateQuestions,
    tableName: questionModel.tableName,
  })

  // Generate answers data
}

main()
