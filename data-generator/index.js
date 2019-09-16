/**
 * A app designed to generate billions data
 */

const {
  initDatabase,
} = require('../databases')

const main = async () => {
  const mysqlClient = await initDatabase()

  console.log(mysqlClient)
}

main()
