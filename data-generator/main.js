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

/**
 * Get an account id from database
 */
const queryAccountId = async (mysqlClient) => {
  const randomId = Random.natural(1, totalAccounts)

  const queryAuthorIdSql = `
    select account_id from ${accountModel.tableName} where id=${randomId}
  `
  const res = await mysqlClient.query(queryAuthorIdSql).catch(err => err)

  if (!res || !res.length) {
    console.log(`Failed to query account id for random Id: ${randomId} with error: ${res.sqlMessage}`)
    return
  }

  return res[0].account_id
}

/**
 * Get an question id from database
 */
const queryQuestionId = async (mysqlClient) => {
  const randomId = Random.natural(1, totalQuestions)

  const queryQuestionIdSql = `
    select question_id from ${questionModel.tableName} where id=${randomId}
  `
  const res = await mysqlClient.query(queryQuestionIdSql).catch(err => err)

  if (!res || !res.length) {
    console.log(`Failed to query question id for random Id: ${randomId} with error: ${res.sqlMessage}`)
    return
  }

  return res[0].question_id
}

/**
 * Get an answer id from database
 */
const queryAnswerId = async (mysqlClient) => {
  const randomId = Random.natural(1, totalAnswers)

  const queryAnswerIdSql = `
    select answer_id from ${answerModel.tableName} where id=${randomId}
  `
  const res = await mysqlClient.query(queryAnswerIdSql).catch(err => err)

  if (!res || !res.length) {
    console.log(`Failed to query answer id for random Id: ${randomId} with error: ${res.sqlMessage}`)
    return
  }

  return res[0].answer_id
}


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

  const authorId = await queryAccountId(mysqlClient)
  if (!authorId) {
    return
  }

  const data = questionModel.generate_question(authorId)
  const sql = utils.getInsertSql(questionModel.tableName, data)

  console.log('Sending sql string to create new question')

  const res = await mysqlClient.query(sql).catch(err => err)

  const millSeconds = Date.now() - start

  if (res && res.affectedRows > 0) {
    console.log(`Successfully create an new question: ${data.question_id} in ${millSeconds} millseconds`)
  } else {
    console.log(`Failed to create an new account with Error: ${res.sqlMessage}`)
  }
}


const generateAnswers = async (mysqlClient) => {
  const start = Date.now()

  const [authorId, questionId] = await Promise.all([
    queryAccountId(mysqlClient),
    queryQuestionId(mysqlClient),
  ])
  if (!authorId || !questionId) {
    return
  }

  const newAnswer = answerModel.generate_answer(authorId, questionId)
  const sql = utils.getInsertSql(answerModel.tableName, newAnswer)

  const res = await mysqlClient.query(sql).catch(err => err)

  const millSeconds = Date.now() - start

  if (res && res.affectedRows > 0) {
    console.log(`Successfully create an new answer: ${newAnswer.answer_id} in ${millSeconds} millseconds`)
  } else {
    console.log(`Failed to create an new answer with Error: ${res.sqlMessage}`)
  }
}


const main = async (grossRowsCount) => {
  const mysqlClient = await initDatabase()
  const dataGeneratorRunner = utils.dataGeneratorRunner(mysqlClient)

  if (!grossRowsCount) {
    return
  }

  // Generate accounts data
  // await dataGeneratorRunner({
  //   concurrentJobs,
  //   grossRowsCount: totalAccounts,
  //   generator: generateAccounts,
  //   tableName: accountModel.tableName,
  // })

  // Generate questions data
  // await dataGeneratorRunner({
  //   concurrentJobs,
  //   grossRowsCount: totalQuestions,
  //   generator: generateQuestions,
  //   tableName: questionModel.tableName,
  // })

  // Generate answers data
  await dataGeneratorRunner({
    concurrentJobs,
    grossRowsCount,
    generator: generateAnswers,
    tableName: answerModel.tableName,
  })
}

module.exports = main
