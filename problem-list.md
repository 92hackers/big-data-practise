# This file will record many mistakes, errors, questions, problems i faced when
doing the practise

### Problems

1. Mysql Error: The total number of locks exceeds the lock table size
  * sql: `DELETE FROM zhihu_answers WHERE id > 10000000;`


2. Bad Performance: When executing count(*) operations on a mysql table which
contains more than 10 million rows of data
  * sql: `SELECT count(*) FROM zhihu_accounts;`
  * optimize: `SELECT max(id) FROM zhihu_accounts;`


3. Bad Performance: When concurrent inserting much more data into database, later insertions will be very slow.
  * sql: `INSERT INTO TABLE zhihu_answers(...fields) VALUES(...fields)`
