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

drop table empresa;
select * from empresa;
insert into empresa values 
(null, 'Vivo', '00. 011. 122/2333-45', 'vivo@gmail.com', '(11)98888-3232', '1202', '09313333', 'Alameda Santos', '1200', 'Jardim Paulista'),
(null, 'Net', '10. 292. 212/3133-33', 'net@gmail.com', '(11)94344-2911', '2921', '04934-434', 'Rua Bela Cintra', '228', 'Jardim Paulista'),
(null, 'Alog', '10.237.985/0001-27', 'atendimento@alog.com', '(11)99812846', 2846, 66410038, 'Av Magalhães Barata', '1730', 'Moema'),
(null, 'Level 3', '72.843.212/0001- 41', 'atendimento@alog.com', '(11)91907823', 7823, 06901219, 'Av Almirante Barroso', '1834', 'Moema'),
(null, 'Santander', '90.400.888/0001-42', 'atendimento@santander.com', '(11)988899035', 9035, 66030123, 'Rua Automotista', 1395, 'Veloso');

select * from usuario;
insert into usuario (nome, data_nasc, CPF, email, senha, fkEmpresa) values
('Marcelo', '1983-02-28', '714.123.456-25', 'marcelo@gmail.com', '321456', 3),
('vinivius', '1983-02-28', '417.321.321-52', 'vini@gmail.com', '030201', 4),
('Luik', '2002-10-21', '382.919.328-92', 'luik@gmail.com', '12345', 1),
('Lucas', '1998-10-03', '383.349.349-01', 'lucas@gmail.com', '99999', 2),
('João', '1995-05-20', '123.943.943-10', 'joao@gmail.com', '232323', 5);

describe usuario;
select * from local_sensor;
insert into local_sensor(andar, sala, quadrante, fkEmpresa) values 
('3', 'Sala 01', 'Central', 1),
('2', 'Sala 04', '2°Quad', 2),
('1', 'Sala 01', 'Central', 5),
('2', 'Sala 02', 'Central', 3),
('3', 'Sala 03', 'Central', 4);
desc local_sensor;

select * from sensor;
insert into sensor values 
(null,'ativo', 1),
(null, 'manutenção', 2),
(null,'inativo', 5),
(null,'ativo', 3),
(null, 'manutenção', 4),
(null,'ativo', 1),
(null, 'manutenção', 2),
(null,'inativo', 5),
(null,'ativo', 3),
(null, 'manutenção', 4);
desc sensor;

select * from registro;
insert into registro(Data_temp, Temperatura, Umidade, fkSensor) values 
(sysdate(), '28°', '60%', 1),
(sysdate(), '0°', '0%', 2),
(sysdate(), '0°', '0%', 3),
(sysdate(), '18°', '35%', 4),
(sysdate(), '0°', '0%', 5),
(sysdate(), '28°', '49%', 1),
(sysdate(), '23°', '44%', 2),
(sysdate(), '24°', '55%', 3),
(sysdate(), '18°', '45%', 4),
(sysdate(), '22°', '50%', 5);
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
select * from registro where Temperatura = '28°';
select * from registro where Temperatura = '0°';
select * from registro where Umidade = '60%';
select * from registro where Umidade = '0%';

