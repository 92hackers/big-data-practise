/**
 * Answer model
 *
 */

const sql = `
  CREATE TABLE IF NOT EXISTS zhihu_answers (
    id int UNSIGNED NOT NULL AUTO_INCREMENT,
    answer_id BIGINT UNSIGNED NOT NULL DEFAULT 0,

    status ENUM('under_review', 'displayed', 'forbidden', 'deleted') NOT NULL DEFAULT 'under_review',

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    content TEXT NOT NULL,
    author_account_id BIGINT UNSIGNED NOT NULL DEFAULT 0,
    question_id BIGINT UNSIGNED NOT NULL DEFAULT 0,
    is_anonymous BIT(1) NOT NULL DEFAULT b'1',

    PRIMARY KEY (id, answer_id)
  ) ENGINE=INNODB CHARACTER SET utf8mb4;
`

module.exports = {
  sql,
}
