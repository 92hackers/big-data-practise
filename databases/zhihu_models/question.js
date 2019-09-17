/**
 * Question model
 *
 */

const Mock = require('mockjs')

const { Random } = Mock

const tableName = 'zhihu_questions'

const sql = `
  CREATE TABLE IF NOT EXISTS ${tableName} (
    id int UNSIGNED NOT NULL AUTO_INCREMENT,
    question_id BIGINT unsigned NOT NULL DEFAULT 0,
    viewed_count BIGINT unsigned NOT NULL DEFAULT 0,

    status ENUM('under_review', 'displayed', 'forbidden', 'deleted') NOT NULL DEFAULT 'under_review',

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    title VARCHAR(64) NOT NULL DEFAULT '',
    question_detail VARCHAR(512) NOT NULL DEFAULT '',
    is_anonymous CHAR(1) NOT NULL DEFAULT '1',
    topic VARCHAR(32) NOT NULL DEFAULT '',
    author_account_id BIGINT UNSIGNED NOT NULL DEFAULT 0,

    PRIMARY KEY (id, question_id)
  ) ENGINE=INNODB CHARACTER SET utf8mb4;
`

const generate_question = (authorId) => {
  // Chinese id card number, may be ends with a signle X char
  const question_id = Random.id().replace('X', Random.d8())

  const viewed_count = Random.id().replace('X', Random.d8())

  const question_detail = Random.pick([
    Random.paragraph(1, 3),
    Random.cparagraph(1, 3),
  ])

  return {
    question_id,
    viewed_count,
    status: Random.pick(['under_review', 'displayed', 'forbidden', 'deleted']),
    title: Random.title(3, 6) + '?',
    question_detail,
    is_anonymous: Random.pick(['1', '0']),
    topic: Random.pick([Random.word(5, 10), Random.cword(3, 7)]),
    author_account_id: authorId,
  }
}

module.exports = {
  sql,
  tableName,
  generate_question,
}
