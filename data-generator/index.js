/**
 * Generate billions of data with cluster mode
 *
 */

const cluster = require('cluster')
const os = require('os')

const {
  totalAccounts,
  totalQuestions,
  totalAnswers,
} = require('../config')

const mainHandler = require('./main')

const workersCount = os.cpus().length

if (cluster.isMaster) {
  // Fork workers.
  for (let i = 0; i < workersCount; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} exited`)
  })
} else {
  // Split total works into sub workers
  const getGrossRowsCount = totalCount => parseInt(totalCount / workersCount)

  // IMPORTANT NOTES:
  // We should make sure generate account, question, answer data firstly.
  // because later models will depends on these data.
  const datasetGrossConfig = [
    {
      name: 'account',
      grossRowsCount: getGrossRowsCount(totalAccounts),
    },
    {
      name: 'question',
      grossRowsCount: getGrossRowsCount(totalQuestions),
    },
    {
      name: 'answer',
      grossRowsCount: getGrossRowsCount(totalAnswers),
    },
  ]

  mainHandler(datasetGrossConfig)
}
