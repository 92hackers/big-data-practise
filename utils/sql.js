/**
 * Sql utils
 */

const getInsertSql = (tableName, newData) => {
  const columns = []
  const values = []

  Object.entries(newData).forEach(([ column, value ]) => {
    columns.push(column)
    values.push(`"${value}"`)
  })

  const columnsStr = `(${columns.join(',')})`
  const valuesStr = `(${values.join(',')})`

  const sql = `
    INSERT INTO ${tableName}${columnsStr}
    VALUES${valuesStr};
  `

  return sql
}

module.exports = {
  getInsertSql,
}
