/**
 * Records relationship between collection and answer
 */

const Mock = require('mockjs')

const { Random } = Mock
const tableName = 'relations_collection_answer'

const sql = `
  CREATE TABLE IF NOT EXISTS ${tableName} (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    answer_id BIGINT UNSIGNED NOT NULL DEFAULT 0,
    collection_id BIGINT UNSIGNED NOT NULL DEFAULT 0,

    PRIMARY KEY id
    KEY collection_id
  ) ENGINE=INNODB CHARACTER SET utf8mb4;
`

const generate_collection_answer_relation = () => {

}

module.exports = {
  sql,
  tableName,
  generate_collection_answer_relation,
}
