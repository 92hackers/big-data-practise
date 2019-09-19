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

const workersCount = os.cpus().length - 1

if (cluster.isMaster) {
  // Fork workers.
  for (let i = 0; i < workersCount; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} exited`)
  })
} else {
  // Split total works into multiple workers
  const grossRowsCount = parseInt(totalAnswers / workersCount)

  mainHandler(grossRowsCount)
}
