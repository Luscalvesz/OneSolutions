use sprint_1;

create table sensor(

id_sensor int primary key auto_increment,
temperatura_mínima int not null,
temperatura_máxima int,
umidade_mínima int,
umidade_máxima int,
data_medição datetime)
auto_increment=100;

insert into sensor values
(null,'13','25','34','45','2020-09-15 11:12:00'),
(null,'12','21','31','41','2020-09-23 22:01:36'),
(null,'11','22','32','42','2020-09-12 09:23:16'),
(null,'14','23','33','43','2020-09-25 12:54:34'),
(null,'15','24','34','44','2020-09-16 06:32:56'),
(null,'16','26','35','46','2020-09-01 21:13:15'),
(null,'17','27','36','47','2020-09-07 14:43:12'),
(null,'18','28','37','48','2020-09-28 16:55:54'),
(null,'19','29','38','49','2020-09-13 19:39:23'),
(null,'20','30','40','50','2020-09-17 03:45:28');
select * from sensor;