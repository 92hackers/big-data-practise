/**
 * Account model
 *
 */

const Mock = require('mockjs')

const { Random } = Mock

const tableName = 'zhihu_accounts'

const sql = `
  CREATE TABLE IF NOT EXISTS ${tableName} (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    account_id BIGINT UNSIGNED NOT NULL DEFAULT 0,
    account_type ENUM('organization', 'personal', 'admin') NOT NULL DEFAULT 'personal',

    status ENUM('inactive', 'active', 'locked', 'archive', 'deleted') NOT NULL DEFAULT 'inactive',

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    email VARCHAR(255) NOT NULL DEFAULT '',
    phone_number BIGINT UNSIGNED NOT NULL DEFAULT 0,
    password VARCHAR(64) NOT NULL DEFAULT '',
    salt VARCHAR(64) NOT NULL DEFAULT '',
    username VARCHAR(64) NOT NULL DEFAULT '',
    gender ENUM('male', 'female') NOT NULL DEFAULT 'male',

    brief_introduction VARCHAR(512) NOT NULL DEFAULT '',
    one_sentence_introductioin VARCHAR(128) NOT NULL DEFAULT '',
    avatar_url VARCHAR(255) NOT NULL DEFAULT '',
    user_cover_url VARCHAR(255) NOT NULL DEFAULT '',
    city VARCHAR(32) NOT NULL DEFAULT '',
    industry VARCHAR(255) NOT NULL DEFAULT '',
    education_level VARCHAR(32) NOT NULL DEFAULT '',
    job_position VARCHAR(255) NOT NULL DEFAULT '',

    PRIMARY KEY (id, account_id)
  ) ENGINE=INNODB CHARACTER SET utf8mb4;
`

const jobPositions = [
  'programmer', 'teacher', 'nurse', '学生', '个体户',
  '老板', '商人', 'lawyer', '领导者', '政府工作人员',
  'soho', 'writer', '流浪汉', '游侠', 'driver',
]

const statues = [
  'inactive', 'active', 'locked', 'archive', 'deleted',
]

const account_types = [
  'organization', 'personal', 'admin',
]

const generate_account = () => {
  const username = Random.pick([
    Random.name(),
    Random.cname(),
  ])

  const brief_introduction = Random.pick([
    Random.paragraph(1, 3),
    Random.cparagraph(1, 3),
  ])

  const one_sentence_introductioin = Random.pick([
    Random.sentence(5, 10),
    Random.csentence(5, 10),
  ])

  // Chinese id card number, may be ends with a signle X char
  const account_id = Random.id().replace('X', Random.d8())

  return {
    account_id,
    avatar_url: Random.url('https'),
    user_cover_url: Random.url('https'),
    city: Random.city(),
    account_type: Random.pick(account_types),
    status: Random.pick(statues),
    email: Random.email(),
    phone_number: Random.id().substr(0, 11),
    password: Random.uuid(),
    salt: Random.uuid(),
    username,
    gender: Random.pick(['male', 'female']),
    brief_introduction,
    one_sentence_introductioin,
    industry: Random.word(3, 20),
    education_level: Random.word(5, 20),
    job_position: Random.pick(jobPositions),
  }
}

module.exports = {
  sql,
  tableName,
  generate_account,
}
