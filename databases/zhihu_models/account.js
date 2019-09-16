/**
 * Account model
 *
 */

const sql = `
  CREATE TABLE IF NOT EXISTS zhihu_accounts (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    account_id BIGINT UNSIGNED NOT NULL DEFAULT 0,
    account_type ENUM('organization', 'personal', 'admin') NOT NULL DEFAULT 'personal',

    status ENUM('inactive', 'active', 'locked', 'archive', 'deleted') NOT NULL DEFAULT 'inactive',

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    email VARCHAR(255) NOT NULL DEFAULT '',
    phone_number int(11) UNSIGNED NOT NULL DEFAULT 0,
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

module.exports = sql
