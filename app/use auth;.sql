use  auth;
select * from users

use auth;
create table users (
    id int not null auto_increment,
    username varchar(50),
    password varchar(500),
    token varchar(500),
    type varchar(100),
    primary key(id)
)

use auth;
insert into users(username,password,type) values("user3","user3","user")

use auth;
delete om users where username = "user4"



use auth;
select * from users where type = "user"
update users set type = "root" where username = "root1" and password = "rootpass1"
select username from users where password = "rootpass1"
select username from users where password = "rootpass1"