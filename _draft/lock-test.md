```sql
CREATE TABLE`test_innodb_lock` (
  `a` int(11) DEFAULT NULL,
  `b` varchar(16) DEFAULT NULL,
  KEY `test_innodb_lock_a_IDX` (`a`)
) ENGINE=InnoDB;
select * from test_innodb_lock;

SELECT * FROM `xwms_wywl_2.2`.test_innodb_lock;
delete from test_innodb_lock where 1=1;
insert into test_innodb_lock values('1','1');
insert into test_innodb_lock values('1','2');
insert into test_innodb_lock values('1','3');
insert into test_innodb_lock values('2','2');
insert into test_innodb_lock values('3','3');
insert into test_innodb_lock values('4','4');
insert into test_innodb_lock values('5','5');


 set autocommit = 0;
 update test_innodb_lock set b ='xxxxx' where a='1' and b = '1';


```