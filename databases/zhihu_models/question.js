/**
 * Question model
 *
 */

const sql = `
  CREATE TABLE IF NOT EXISTS zhihu_questions (
    id int UNSIGNED NOT NULL AUTO_INCREMENT,
    question_id BIGINT unsigned NOT NULL DEFAULT 0,
    viewed_count BIGINT unsigned NOT NULL DEFAULT 0,

    status ENUM('under_review', 'displayed', 'forbidden', 'deleted') NOT NULL DEFAULT 'under_review',

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    title VARCHAR(64) NOT NULL DEFAULT '',
    question_detail VARCHAR(512) NOT NULL DEFAULT '',
    is_anonymous BIT(1) NOT NULL DEFAULT b'1',
    topic VARCHAR(32) NOT NULL DEFAULT '',
    author_account_id BIGINT UNSIGNED NOT NULL DEFAULT 0,

    PRIMARY KEY (id, question_id)
  ) ENGINE=INNODB CHARACTER SET utf8mb4;
`

module.exports = {
  sql,
}
