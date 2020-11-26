create database One_solutions;

use One_solutions;

create table empresa (
idEmpresa int primary key auto_increment,
nome varchar(45),
CNPJ char(25),
email varchar(45),
telefone char(18),
ramal char(5),
CEP char(10),
logradouro varchar(100),
numero varchar(10),
bairro varchar(30)
);


create table usuario (
idUsuario int primary key auto_increment,
nome varchar(30),
data_nasc date,
CPF char(15),
email varchar(30),
senha varchar(30),
fkEmpresa int,
foreign key (fkEmpresa) references empresa (idEmpresa)
)auto_increment= 100;


create table local_sensor (
idLocal int primary key auto_increment,
andar char(3),
sala varchar(8),
quadrante varchar(10),
fkEmpresa int,
foreign key (fkEmpresa) references empresa (idEmpresa)
);


create table sensor (
idSensor int primary key auto_increment,
status_sensor varchar (10),
check (status_sensor = "inativo" or status_sensor = "ativo" or status_sensor = "manutenção"),
fkLocal int,
foreign key (fkLocal) references local_sensor (idLocal)
);

create table registro (
idRegistro int primary key auto_increment,
data_temp datetime,
temperatura varchar(5),
umidade varchar(5),
fkSensor int,
foreign key (fkSensor) references sensor (idSensor)
);
drop table registro;

desc registro;

select * from empresa;
insert into empresa values 
(null, 'Vivo', '00. 011. 122/2333-45', 'vivo@gmail.com', '(11)98888-3232', '1202', '09313333', 'Alameda Santos', '1200', 'Jardim Paulista'),
(null, 'Net', '10. 292. 212/3133-33', 'net@gmail.com', '(11)94344-2911', '2921', '04934-434', 'Rua Bela Cintra', '228', 'Jardim Paulista'),
(null, 'Alog', '10.237.985/0001-27', 'atendimento@alog.com', '(11)99812846', 2846, 66410038, 'Av Magalhães Barata', '1730', 'Moema');

select * from usuario;
insert into usuario (nome, data_nasc, CPF, email, senha, fkEmpresa) values
('Marcelo', '1983-02-28', '714.123.456-25', 'marcelo@gmail.com', '321456', 3),
('Vinicius', '1983-02-28', '417.321.321-52', 'vini@gmail.com', '030201', 2),
('Luik', '2002-10-21', '382.919.328-92', 'luik@gmail.com', '12345', 1);

describe usuario;
select * from local_sensor;
insert into local_sensor(andar, sala, quadrante, fkEmpresa) values 
('3', 'Sala 01', 'Central', 1),
('2', 'Sala 04', '2°Quad', 3),
('1', 'Sala 01', 'Central', 2);

desc local_sensor;

select * from sensor;
insert into sensor values 
(null,'ativo', 1),
(null, 'manutenção', 2),
(null,'inativo', 3);
desc sensor;

select * from registro;
insert into registro(Data_temp, Temperatura, Umidade, fkSensor) values 
(sysdate(), '25°', '48%', 1),
(sysdate(), '0°', '0%', 2),
(sysdate(), '20°', '50%', 3);
update registro set Temperatura = '0°' where idRegistro = '3';
update registro set Umidade = '0%' where idRegistro = '3';
desc registro;

select * from empresa;
select * from usuario;
select * from local_sensor;
select * from sensor;
select * from registro;

select * from empresa where CNPJ = '10.237.985/0001-27';
select * from usuario where CPF = '382.919.328-92';
select * from local_sensor where sala = 'Sala 01';
select * from sensor where status_sensor = 'ativo';
select * from sensor where status_sensor = 'inativo';
select * from sensor where status_sensor = 'manutencao';
select * from registro where Temperatura = '25°';
select * from registro where Temperatura = '0°';
select * from registro where Umidade = '48%';
select * from registro where Umidade = '0%';

