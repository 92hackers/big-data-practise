/**
 * App Configuration
 */

module.exports = {
  mysql: {
    host: 'localhost',
    port: '3306',
    user: 'big_data_practise',
    password: 'big_data_practise_passwd',
    database: 'zhihu_db',
  },
  concurrentJobs: 50,
  totalAccounts: 10000000,
  totalQuestions: 20000000,
  totalAnswers: 100000000,
}
