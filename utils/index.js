/**
 * Utilities, helper functions
 */

const sqlUtils = require('./sql')

const sleep = milliseconds => new Promise(resolve => {
  setTimeout(resolve, milliseconds)
})

const dataGeneratorRunner = (mysqlClient) => async ({
  concurrentJobs,
  grossRowsCount,
  generator,
  tableName,
}) => {
  const start = Date.now()
  const outerLoopCount = grossRowsCount / concurrentJobs

  let i = 0
  let j = 0

  while (i < outerLoopCount) {
    const promises = []
    j = 0
    while (j < concurrentJobs) {
      promises.push(generator(mysqlClient))
      j++
    }

    await Promise.all(promises)
    i++
  }

  const seconds = (Date.now() - start) / 1000

  console.log(`Finished creating ${grossRowsCount} ${tableName} in ${seconds} seconds`)
}

module.exports = {
  ...sqlUtils,
  sleep,
  dataGeneratorRunner,
}
