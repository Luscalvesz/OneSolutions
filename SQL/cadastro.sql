create database sprint_1;

use sprint_1;

create table cadastro(
id_cadastro int primary key auto_increment,
nome varchar(40) not null,
telefone varchar(40),
email varchar(40),
cnpj varchar (40),
senha varchar(40))
auto_increment=1;

insert into cadastro values 
(null,'João','95674829','Joãozin@gmail.com','00000127483956','1234'),
(null,'Marcos','95674828','Marcos@gmail.com','00000127483951','1233'),
(null,'Luana','95674827','Beatriz@gmail.com','00000127483950','1230'),
(null,'Leonardo','95674826','Leonardo@gmail.com','00000127483952','1231'),
(null,'Ronaldo','95674825','Ronaldo@gmail.com','00000127483953','1232'),
(null,'Daniel','95674824','Daniel@gmail.com','00000127483954','1235'),
(null,'Mateus','95674823','Mateus@gmail.com','00000127483955','1236'),
(null,'Eduardo','95674822','Eduardo@gmail.com','00000127483957','1237'),
(null,'Eduarda','95674821','Eduarda@gmail.com','00000127483958','1238'),
(null,'Roberto','95674820','Roberto@gmail.com','00000127483959','1239');

select * from cadastro;