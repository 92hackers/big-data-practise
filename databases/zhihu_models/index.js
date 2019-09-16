/**
 * Models entry
 */

const accountModel = require('./account')
const questionModel = require('./question')
const answerModel = require('./answer')

module.exports = [
  accountModel,
  questionModel,
  answerModel,
]
