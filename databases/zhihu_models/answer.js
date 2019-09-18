/**
 * Answer model
 *
 */

const Mock = require('mockjs')

const { Random } = Mock

const tableName = 'zhihu_answers'

const sql = `
  CREATE TABLE IF NOT EXISTS ${tableName} (
    id int UNSIGNED NOT NULL AUTO_INCREMENT,
    answer_id BIGINT UNSIGNED NOT NULL DEFAULT 0,

    status ENUM('under_review', 'displayed', 'forbidden', 'deleted') NOT NULL DEFAULT 'under_review',

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    content TEXT NOT NULL,
    author_account_id BIGINT UNSIGNED NOT NULL DEFAULT 0,
    question_id BIGINT UNSIGNED NOT NULL DEFAULT 0,
    is_anonymous CHAR(1) NOT NULL DEFAULT '1',

    PRIMARY KEY (id, answer_id)
  ) ENGINE=INNODB CHARACTER SET utf8mb4;
`

const generate_answer = (authorId, questionId) => {
  // Chinese id card number, may be ends with a signle X char
  const answer_id = Random.id().replace('X', Random.d8())

  return {
    answer_id,
    status: Random.pick(['under_review', 'displayed', 'forbidden', 'deleted']),
    content: Random.pick([Random.paragraph(10, 100), Random.cparagraph(10, 100)]),
    author_account_id: authorId,
    question_id: questionId,
    is_anonymous: Random.pick(['1', '0']),
  }
}

module.exports = {
  sql,
  tableName,
  generate_answer,
}
