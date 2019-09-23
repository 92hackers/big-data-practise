/**
 * Zhi hu collection model, used to collect good answers.
 */

const Mock = require('mockjs')

const { Random } = Mock

const tableName = 'zhihu_collections'

const sql = `
  CREATE TABLE IF NOT EXISTS ${tableName} (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    collection_id BIGINT UNSIGNED NOT NULL DEFAULT 0,

    status ENUM('inactive', 'active', 'locked', 'archive', 'deleted') NOT NULL DEFAULT 'active',

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    author_account_id BIGINT UNSIGNED NOT NULL DEFAULT 0,
    title VARCHAR(512) NOT NULL DEFAULT '',
    description VARCHAR(5000) NOT NULL DEFAULT '',
    is_private CHAR(1) NOT NULL DEFAULT '1',
    remark VARCHAR(256) NOT NULL DEFAULT '',

    PRIMARY KEY (id, collection_id)
  ) ENGINE=INNODB CHARACTER SET utf8mb4;
`

const generate_collection = () => {

}

module.exports = {
  sql,
  tableName,
  generate_collection,
}
